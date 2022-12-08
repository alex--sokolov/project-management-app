import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import {
  CancelDrop,
  // closestCenter,
  // pointerWithin,
  // rectIntersection,
  // CollisionDetection,
  DndContext,
  DragOverlay,
  // DropAnimation,
  // getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  // useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  // defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  // AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  // defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { coordinateGetter as multipleContainersCoordinateGetter } from './multipleContainersKeyboardCoordinates';

import { Item } from '../Components/Item';
import { Container } from '../Components/Container';
import type { ContainerProps } from '../Components/Container';

import { ColumnWithTasks, MultipleProps, Task } from '@/data/models';
import { useRemoveColumnById } from '@/hooks/board/useRemoveColumnById';
import { useChangeColumnsOrder } from '@/hooks/board/useChangeOrdersInColumns';
import { ColumnForm } from '@/components/pages/Board/Components/Forms';
import { useCreateColumn } from '@/hooks/board/useCreateColumn';
import { TaskForm } from '../Components/Forms/TaskForm';
import { useCreateTask } from '@/hooks/board/useCreateTask';
import { useTranslation } from 'react-i18next';
import { useChangeTasksOrder } from '@/hooks/board/useChangeOrdersInTasks';
import { Modal } from '@/services/modals';
import { useModal } from '@/hooks';
import { useDeleteTask } from '@/hooks/board/useDeleteTask';

// const animateLayoutChanges: AnimateLayoutChanges = (args) =>
//   defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const getColumnTitle = (columns: ColumnWithTasks[], id: string | number) => {
  return columns.find((column: ColumnWithTasks) => column._id === id)?.title || '';
};

function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: ContainerProps & {
  disabled?: boolean;
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  style?: React.CSSProperties;
}) {
  const {
    // active,
    attributes,
    isDragging,
    listeners,
    // over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: 'container',
      children: items,
    },
    // animateLayoutChanges
  });
  // const isOverContainer = over
  //   ? (id === over.id && active?.data.current?.type !== "container") ||
  //     items.includes(over.id)
  //   : false;

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      // hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}
    >
      {children}
    </Container>
  );
}

// const dropAnimation: DropAnimation = {
//   sideEffects: defaultDropAnimationSideEffects({
//     styles: {
//       active: {
//         opacity: '0.5',
//       },
//     },
//   }),
// };

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  data: MultipleProps;

  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;

  wrapperStyle?(args: { index: number }): React.CSSProperties;

  itemCount?: number;
  items?: Items;
  handle?: boolean;
  renderItem?: () => React.ReactElement;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';
const empty: UniqueIdentifier[] = [];

function getColor(id: UniqueIdentifier) {
  switch (String(id)[String(id).length - 1]) {
    case '1':
    case '5':
    case '9':
    case 'd':
      return '#7193f1';
    case '2':
    case '6':
    case 'a':
    case 'e':
      return '#ffda6c';
    case '3':
    case '7':
    case 'b':
    case 'f':
      return '#00bcd4';
    case '4':
    case '8':
    case 'c':
    case 'h':
      return '#ef769f';
  }

  return undefined;
}

// function Trash({ id }: { id: UniqueIdentifier }) {
//   const { setNodeRef, isOver } = useDroppable({
//     id,
//   });
//
//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'fixed',
//         left: '50%',
//         marginLeft: -150,
//         bottom: 20,
//         width: 300,
//         height: 60,
//         borderRadius: 5,
//         border: '1px solid',
//         borderColor: isOver ? 'red' : '#DDD',
//       }}
//     >
//       Drop here to delete
//     </div>
//   );
// }

interface SortableItemProps {
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  index: number;
  handle: boolean;
  disabled?: boolean;

  style(args: unknown): React.CSSProperties;

  getIndex(id: UniqueIdentifier): number;

  renderItem(): React.ReactElement;

  wrapperStyle({ index }: { index: number }): React.CSSProperties;

  boardId: string;
}

function SortableItem({
  disabled,
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  getIndex,
  wrapperStyle,
  boardId,
}: SortableItemProps) {
  const {
    setNodeRef,
    // setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  });

  function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setIsMounted(true), 500);

      return () => clearTimeout(timeout);
    }, []);

    return isMounted;
  }

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;
  const taskDelete = useDeleteTask();

  async function handleRemoveItem(value: string, taskId: UniqueIdentifier): Promise<void> {
    if (value === 'yes') {
      // let columnId = null;
      // for (let i = 0; i < columns.length; i++) {
      //   const task = columns[i].tasks.find((task) => task._id === taskId);
      //   if (task) {
      //     columnId = task.columnId;
      //     break;
      //   }
      // }

      // console.log('taskID', taskId);
      // console.log('columnId: ', columnId);
      // console.log('containerId.toString(): ', containerId.toString());
      // console.log('boardId: ', boardId);
      await taskDelete.mutateAsync({
        boardId: boardId,
        columnId: containerId.toString(),
        taskId: taskId.toString(),
      });
    }
  }

  const { t } = useTranslation();
  const { isModalOpen, close, open } = useModal();
  const modalType = `${t('modal.column-delete-confirm-question')}`;

  return (
    <>
      <Item
        ref={disabled ? undefined : setNodeRef}
        value={id}
        dragging={isDragging}
        sorting={isSorting}
        handle={handle}
        // handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
        index={index}
        wrapperStyle={wrapperStyle({ index })}
        style={style({
          index,
          value: id,
          isDragging,
          isSorting,
          overIndex: over ? getIndex(over.id) : overIndex,
          containerId,
        })}
        onRemove={open}
        color={getColor(id)}
        transition={transition}
        transform={transform}
        fadeIn={mountedWhileDragging}
        listeners={listeners}
        renderItem={renderItem}
      />
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            text={modalType}
            handleClick={(value) => {
              close();
              if (handleRemoveItem) {
                handleRemoveItem(value, id).catch((error) => console.log(error));
              }
            }}
          />
        )}
      </div>
    </>
  );
}

export const MultipleContainers = ({
  // adjustScale = false,
  // itemCount = 2,
  // cancelDrop,
  columns,
  handle = true,
  data,
  // items: initialItems,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  // modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  // trashable = false,
  vertical = false,
  scrollable,
}: Props) => {
  const { t } = useTranslation();

  const columnDelete = useRemoveColumnById();
  const columnCreate = useCreateColumn();
  const taskCreate = useCreateTask();
  const columnsData = data.columnsData;
  const boardId = data.boardData._id;

  const columnsArr = columnsData.columns;
  // console.log('columnsArr: ', columnsArr);

  const myItems = useMemo(
    () =>
      columnsArr.reduce((acc, column) => {
        const tasks = column.tasks;
        tasks.sort((a, b) => a.order - b.order);
        return { ...acc, [column._id]: tasks.map((task) => task._id) };
      }, {}),
    [columnsArr]
  );
  // console.log('myItems', myItems);
  const [items, setItems] = useState<Items>(myItems);

  const [needToChangeOrder, setNeedToChangeOrder] = useState(false);
  const [activeColumn, setActiveColumn] = useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    if (myItems !== items && needToChangeOrder) {
      const itemsSorted = Object.entries(items).filter((column) => {
        const columnBack = Object.entries(myItems).find((value) => {
          return column[0] === value[0];
        });
        return columnBack && column[1].length !== (columnBack[1] as string[])?.length;
      });
      if (itemsSorted.length === 2) {
        const tasksArrNewOrder = itemsSorted.map((column) => {
          const columnId = column[0];
          const tasks = (column[1] as string[]).map((taskId: string, taskIndex: number) => ({
            _id: taskId,
            order: taskIndex,
            columnId,
          }));
          return [...tasks];
        });

        tasksOrder.mutate(tasksArrNewOrder.flat(1));
      }
      if (itemsSorted.length === 0 && activeColumn) {
        const itemsSorted = Object.entries(items).filter((column) => column[0] === activeColumn);
        const tasks = (itemsSorted[0][1] as string[]).map((taskId: string, taskIndex: number) => ({
          _id: taskId,
          order: taskIndex,
          columnId: activeColumn.toString(),
        }));
        tasksOrder.mutate(tasks);
      }
    }
    setNeedToChangeOrder(false);
    setActiveColumn(null);
  }, [items, needToChangeOrder]);

  const columnsOrder = useChangeColumnsOrder();
  const tasksOrder = useChangeTasksOrder();

  const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[]);

  const [wasChanged, setWasChanged] = useState(false);

  useEffect(() => {
    const checkOrderColumns = (arrNew: ColumnWithTasks[], columns: UniqueIdentifier[]) => {
      if (arrNew.length !== columns.length) {
        return true;
      }
      for (let i = 0; i < arrNew.length; i++) {
        const columnByOrder = arrNew.find((order) => order.order === i);
        if (!columnByOrder) {
          return true;
        }
        if (columnByOrder._id !== columns[i]) {
          return true;
        }
      }
      return false;
    };
    const isOrderColumnsChanged = checkOrderColumns(columnsArr, containers);

    // const checkChangingItemsAmount = (itemsFront: Items, itemsBack: Items) => {
    //   const frontItemsAmount = Object.values(itemsFront).reduce((acc, cur) => {
    //     console.log('acc', acc);
    //     console.log('cur', cur);
    //
    //     return acc + cur.length;
    //   }, 0);
    //   // const backItemsAmount = itemsFront.reduce((acc, cur) => {
    //   //   return acc + cur.length;
    //   // }, 0);
    //
    //   console.log('frontItemsAmount', frontItemsAmount);
    //   // console.log('backItemsAmount', backItemsAmount);
    // };
    //
    // const isItemsAmountChanged = checkChangingItemsAmount(items, myItems);
    (async () => {
      if (isOrderColumnsChanged && !wasChanged) {
        if (columnsArr.length > 1) {
          const columnsArrNewOrder = columnsArr.map((column: ColumnWithTasks, index: number) => ({
            _id: column._id,
            order: index,
          }));
          await columnsOrder.mutateAsync(columnsArrNewOrder);
        }
        if (myItems !== items) {
          setItems(myItems);
          setContainers(Object.keys(myItems) as UniqueIdentifier[]);
          setWasChanged(true);
        }
      }

      if (!isOrderColumnsChanged && wasChanged) {
        setWasChanged(false);
      }
    })();
  }, [myItems, items, wasChanged]);

  useEffect(() => {
    const checkChangingItemsAmount = (itemsFront: Items, itemsBack: Items) => {
      const frontItemsAmount = Object.values(itemsFront).reduce((acc, cur) => {
        return acc + cur.length;
      }, 0);
      const backItemsAmount = Object.values(itemsBack).reduce((acc, cur) => {
        return acc + cur.length;
      }, 0);
      return frontItemsAmount !== backItemsAmount;
    };

    const isItemsAmountChanged = checkChangingItemsAmount(items, myItems);

    if (isItemsAmountChanged) {
      if (columnsArr.length > 0) {
        const tasksArrNewOrder = columnsArr.map((column: ColumnWithTasks) => {
          const tasksSorted = column.tasks;
          tasksSorted.sort((a, b) => a.order - b.order);

          const tasks = tasksSorted.map((task: Task, taskIndex: number) => ({
            _id: task._id,
            order: taskIndex,
            columnId: task.columnId,
          }));
          return [...tasks];
        });
        if (tasksArrNewOrder.flat(1).length > 0) {
          tasksOrder.mutate(tasksArrNewOrder.flat(1));
        }
      }
      if (myItems !== items) {
        setItems(myItems);
        setContainers(Object.keys(myItems) as UniqueIdentifier[]);
      }
    }

    // else {
    //   if (myItems !== items) {
    //     const tasksArrNewOrder = Object.entries(items).map((column) => {
    //       const columnId = column[0];
    //       const tasks = (column[1] as string[]).map((taskId: string, taskIndex: number) => ({
    //         _id: taskId,
    //         order: taskIndex,
    //         columnId,
    //       }));
    //       return [...tasks];
    //     });
    //     console.log('tasksArrNewOrder', tasksArrNewOrder.flat(1));
    //     tasksOrder.mutate(tasksArrNewOrder.flat(1));
    //   }
    // }
  }, [myItems, items]);

  // useEffect(() => {
  //   columnsOrder.mutate(
  //     columnsArr.map((column: ColumnWithTasks, index: number) => ({
  //       _id: column._id,
  //       order: index,
  //     }))
  //   );
  //   setItems(myItems);
  //   setContainers(Object.keys(myItems) as UniqueIdentifier[]);
  // }, [myItems]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  // const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  // const collisionDetectionStrategy: CollisionDetection = useCallback(
  //   (args) => {
  //     if (activeId && activeId in items) {
  //       return closestCenter({
  //         ...args,
  //         droppableContainers: args.droppableContainers.filter(
  //           (container) => container.id in items
  //         ),
  //       });
  //     }
  //
  //     // Start by finding any intersecting droppable
  //     const pointerIntersections = pointerWithin(args);
  //     const intersections =
  //       pointerIntersections.length > 0
  //         ? // If there are droppables intersecting with the pointer, return those
  //           pointerIntersections
  //         : rectIntersection(args);
  //     let overId = getFirstCollision(intersections, 'id');
  //
  //     if (overId != null) {
  //       if (overId === TRASH_ID) {
  //         // If the intersecting droppable is the trash, return early
  //         // Remove this if you're not using trashable functionality in your app
  //         return intersections;
  //       }
  //
  //       if (overId in items) {
  //         const containerItems = items[overId];
  //
  //         // If a container is matched and it contains items (columns 'A', 'B', 'C')
  //         if (containerItems.length > 0) {
  //           // Return the closest droppable within that container
  //           overId = closestCenter({
  //             ...args,
  //             droppableContainers: args.droppableContainers.filter(
  //               (container) => container.id !== overId && containerItems.includes(container.id)
  //             ),
  //           })[0]?.id;
  //         }
  //       }
  //
  //       lastOverId.current = overId;
  //
  //       return [{ id: overId }];
  //     }
  //
  //     // When a draggable item moves to a new container, the layout may shift
  //     // and the `overId` may become `null`. We manually set the cached `lastOverId`
  //     // to the id of the draggable item that was moved to the new container, otherwise
  //     // the previous `overId` will be returned which can cause items to incorrectly shift positions
  //     if (recentlyMovedToNewContainer.current) {
  //       lastOverId.current = activeId;
  //     }
  //
  //     // If no droppable is matched, return the last match
  //     return lastOverId.current ? [{ id: lastOverId.current }] : [];
  //   },
  //   [activeId, items]
  // );
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        // onRemove={(value: string): Promise<void> =>
        //   handleRemoveItem(value, findContainer(id) as UniqueIdentifier)
        // }
        color={getColor(id)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    const containerTitle = getColumnTitle(columnsArr, containerId);
    return (
      <Container
        label={`${t('board.column')}: ${containerTitle}`}
        columns={columns}
        style={{
          height: '100%',
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item, index) => (
          <Item
            key={item}
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            // onRemove={(value: string): Promise<void> => handleRemoveItem(value, containerId)}
            color={getColor(item)}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          />
        ))}
      </Container>
    );
  }

  async function handleRemove(value: string, containerID: UniqueIdentifier): Promise<void> {
    if (value === 'yes') {
      await columnDelete.mutateAsync({
        boardId: data.boardData._id,
        columnId: containerID.toString(),
      });
    }
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }

  const handleAddColumn = async ({
    title,
    order,
    boardId,
  }: {
    title: string;
    order: number;
    boardId: string;
  }): Promise<void> => {
    await columnCreate.mutateAsync({
      boardId,
      column: {
        title: title,
        order: order - 1,
      },
    });
  };

  const handleAddTask = async (
    boardId: string,
    columnId: string,
    userId: string,
    {
      title,
      description,
      order,
    }: {
      title: string;
      description: string;
      order: number;
    }
  ): Promise<void> => {
    await taskCreate.mutateAsync({
      boardId,
      columnId,
      task: {
        title: title,
        description: description,
        userId: userId,
        order: order - 1,
        users: [],
      },
    });
  };

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter((item) => item !== active.id),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(newIndex, items[overContainer].length),
              ],
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          let activeIndex = 0;
          let overIndex = 0;
          for (let i = 0; i < columnsArr.length; i++) {
            if (columnsArr[i]._id === active.id) {
              activeIndex = i;
            }
          }
          for (let i = 0; i < columnsArr.length; i++) {
            if (columnsArr[i]._id === over.id) {
              overIndex = i;
            }
          }
          const movedColumns = arrayMove(columnsArr, activeIndex, overIndex);
          columnsOrder.mutate(
            movedColumns.map((column: ColumnWithTasks, index: number) => ({
              _id: column._id,
              order: index,
            }))
          );

          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);
            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        if (overId === TRASH_ID) {
          setItems((items) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter((id) => id !== activeId),
          }));
          setActiveId(null);
          return;
        }

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId();

          unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setItems((items) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter((id) => id !== activeId),
              [newContainerId]: [active.id],
            }));
            setActiveId(null);
          });
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);
          if (overContainer === activeContainer) {
            setNeedToChangeOrder(true);
            setActiveColumn(activeContainer);
          }
          if (activeIndex !== overIndex) {
            const sortItems = (items: Items) => ({
              ...items,
              [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
            });
            const itemsSorted = sortItems(items);
            setItems(itemsSorted);
          }
        }

        setActiveId(null);
      }}
      // cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      // modifiers={modifiers}
    >
      <div
        style={{
          display: 'inline-grid',
          boxSizing: 'border-box',
          padding: 20,
          gridAutoFlow: vertical ? 'row' : 'column',
        }}
      >
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={vertical ? verticalListSortingStrategy : horizontalListSortingStrategy}
        >
          {containers.map((containerId) => {
            const containerTitle = getColumnTitle(columnsArr, containerId);

            return (
              <DroppableContainer
                key={containerId}
                id={containerId}
                label={minimal ? undefined : `${t('board.column')} ${containerTitle}`}
                columns={columns}
                items={items[containerId]}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={minimal}
                onRemove={(value: string) => handleRemove(value, containerId)}
              >
                <SortableContext items={items[containerId]} strategy={strategy}>
                  {items[containerId].map((value, index) => {
                    return (
                      <SortableItem
                        disabled={isSortingContainer}
                        key={value}
                        id={value}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem as unknown as () => React.ReactElement}
                        containerId={containerId}
                        getIndex={getIndex}
                        boardId={boardId}
                      />
                    );
                  })}
                </SortableContext>
                <TaskForm
                  createTask={handleAddTask}
                  boardId={data.boardData._id}
                  columnId={containerId.toString()}
                  userId={data.userData._id}
                />
              </DroppableContainer>
            );
          })}
          {minimal ? undefined : (
            <DroppableContainer
              id={PLACEHOLDER_ID}
              disabled={isSortingContainer}
              items={empty}
              placeholder
            >
              <ColumnForm createColumn={handleAddColumn} boardId={data.boardData._id} />
            </DroppableContainer>
          )}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
      {/* {trashable && activeId && !containers.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null} */}
    </DndContext>
  );
};
