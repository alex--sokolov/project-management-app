import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

import { Handle } from '../Handle';
import { Remove } from '../Remove';

import './Container.scss';

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
  onRemove?(): void;
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
    const Component = onClick ? 'button' : 'div';

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
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    );
  }
);
