import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

import { Handle } from '../Handle';
import { Remove } from '../Remove';

import './Container.scss';
import { Modal } from '@/services/modals';
import { useModal } from '@/hooks';
import { useTranslation } from 'react-i18next';

export interface Props {
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
    const modalType = `${t('modal.column-delete-confirm-question')}`;
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
            {label}
            <div className={'Actions'}>
              <Remove onClick={open} />
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
        <div>
          {isModalOpen && (
            <Modal
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
