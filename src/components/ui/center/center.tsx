import { FC, memo } from 'react';

import styles from './center.module.css';

import { TCenterUI } from './type';

export const CenterUI: FC<TCenterUI> = memo(({ title, children }) => (
  <>
    <div className={styles.center}>
      <div className={styles.header}>
        <h3 className={`${styles.title} text_type_main-medium `}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  </>
));
