'use client';

import React from 'react';
import * as styles from './page.css';
import TextInputField from '@/app/_components/TextInputField';
import SolidButton from '@/app/_components/SolidButton';
import GradButton from '@/app/_components/GradButton';
import GameListGrid from './_components/GameListGrid';

const MainLobby = () => {
  const [search, setSearch] = React.useState('');

  return (
    <div className={styles.lobbyContainer}>
      <div className={styles.centerContainer}>
        <div className={styles.toolBar}>
          <div className={styles.searchInput}>
            <TextInputField
              value={search}
              placeholder="검색"
              borderRadius={12}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              endAdornment={
                <SolidButton shadowExist={false}>
                  <span>검색</span>
                </SolidButton>
              }
            />
          </div>
          <div className={styles.createButton}>
            <GradButton color="secondary" fullWidth>
              방 만들기
            </GradButton>
          </div>
        </div>
        <GameListGrid />
      </div>
    </div>
  );
};

export default MainLobby;