import React, { ForwardedRef, forwardRef, useState } from 'react';
import classNames from 'classnames';

import { Handle } from '../Handle';
import { Remove } from '../Remove';

import './Container.scss';
import { useModal } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { ModalConfirm } from '@/components/shared/ModalConfirm';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Column, ColumnWithTasks } from '@/data/models';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export interface Props {
  handleUpdateColumn?: (boardId: string, column: Omit<Column, 'boardId'>) => Promise<void>;
  columnInfo?: ColumnWithTasks;
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<unknown>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;

  onClick?(): void;

  onRemove?(value: string): Promise<void>;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      handleUpdateColumn,
      columnInfo,
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { t } = useTranslation();
    const Component = onClick ? 'button' : 'div';
    const { isModalOpen, close, open } = useModal();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const editOn = () => setIsEditMode(true);
    const editOff = () => setIsEditMode(false);

    const modalType = `${t('modal.column-delete-confirm-question')}`;

    const [title, setTitle] = useState(columnInfo?.title);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<Omit<Column, '_id | boardId'>>({
      defaultValues: {
        title: title,
      },
    });

    const exit = () => {
      reset({ title });
      editOff();
    };

    const onSubmit: SubmitHandler<Omit<Column, '_id | order | boardId'>> = async (data) => {
      reset({ title: data.title });

      if (handleUpdateColumn) {
        if (columnInfo?.boardId) {
          const newColumnData: Omit<Column, 'boardId'> = {
            _id: columnInfo._id,
            title: data.title,
            order: columnInfo.order,
          };
          await handleUpdateColumn(columnInfo.boardId, newColumnData);
          console.log('editOff');
          editOff();
        }
      }
      setTitle(data.title);
    };

    return (
      <Component
        {...props}
        // @ts-ignore
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        className={classNames(
          'Container',
          unstyled && 'unstyled',
          horizontal && 'horizontal',
          hover && 'hover',
          placeholder && 'placeholder',
          scrollable && 'scrollable',
          shadow && 'shadow'
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={'Header'}>
            {isEditMode ? (
              <form onSubmit={handleSubmit(onSubmit)} className="change-column-title">
                <div className="column-title__element">
                  <TextField
                    error={!!errors.title}
                    label={t('board.column-title')}
                    {...register('title', {
                      required: t('forms-errors.required') || 'required',
                      minLength: {
                        value: 4,
                        message: t('forms-errors.add-title.min-length'),
                      },
                      maxLength: {
                        value: 25,
                        message: t('forms-errors.add-title.max-length'),
                      },
                    })}
                    size="small"
                    sx={{
                      '& label[data-shrink="false"]': {
                        transform: 'translate(14px,2px) scale(1)',
                        webkitTransform: 'translate(14px,2px) scale(1)',
                        fontSize: '12px',
                      },
                    }}
                  />
                  <p className="error">
                    {errors.title && <span className="error__show">{errors.title.message}</span>}
                  </p>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!!Object.keys(errors).length || isSubmitting}
                  style={{
                    minWidth: '22px',
                    padding: '0',
                    height: '22px',
                    margin: '0',
                    marginLeft: '5px',
                  }}
                >
                  <DoneAllIcon aria-label="save editing title" style={{ fontSize: '14px' }} />
                </Button>
                <Button
                  variant="contained"
                  onClick={exit}
                  style={{
                    minWidth: '22px',
                    padding: '0',
                    height: '22px',
                    margin: '0',
                    marginLeft: '2px',
                  }}
                >
                  <HighlightOffIcon aria-label="close editing title" style={{ fontSize: '14px' }} />
                </Button>
              </form>
            ) : (
              <>
                <span className="column-word">{t('board.column')}</span>{' '}
                <span className="column-title"> {title} </span>
                {/*<span className="column-edit" onClick={editOn}>*/}
                <Button
                  variant="contained"
                  onClick={editOn}
                  style={{
                    minWidth: '22px',
                    padding: '0',
                    height: '22px',
                    margin: '0',
                    marginLeft: '5px',
                  }}
                >
                  <EditIcon aria-label="edit column title" style={{ fontSize: '14px' }} />
                </Button>
                {/*</span>*/}
              </>
            )}
            <div className={'Actions'}>
              <Remove onClick={open} />
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
        <div>
          {isModalOpen && (
            <ModalConfirm
              isModalOpen={isModalOpen}
              text={modalType}
              handleClick={(value) => {
                close();
                if (onRemove) {
                  onRemove(value).catch((error) => console.log(error));
                }
              }}
            />
          )}
        </div>
      </Component>
    );
  }
);
