import React, { useState } from 'react';
import styles from './IndustryForm.module.scss';
import { Industry } from '../../@typs/Industry.ts';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface IndustryFormProps {
  industries: Industry[];
  onUpdateIndustries: (updatedIndustries: Industry[]) => void;
}

const IndustryForm: React.FC<IndustryFormProps> = ({
  industries,
  onUpdateIndustries,
}) => {
  const [newIndustry, setNewIndustry] = useState<string>('');
  const [newKeywords, setNewKeywords] = useState<string>('');

  const handleAddIndustry = () => {
    if (newIndustry.trim()) {
      const keywordsArray = newKeywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);

      onUpdateIndustries([
        ...industries,
        { name: newIndustry, keywords: [...new Set(keywordsArray)] },
      ]);

      setNewIndustry('');
      setNewKeywords('');
    }
  };

  return (
    <div className={cx('container')}>
      <h3>업종 관리</h3>
      <div className={cx('add-industry')}>
        <input
          type="text"
          placeholder="새로운 업종 이름"
          value={newIndustry}
          onChange={(e) => setNewIndustry(e.target.value)}
          className={cx('input')}
        />
        <input
          type="text"
          placeholder="키워드 입력 (콤마로 구분)"
          value={newKeywords}
          onChange={(e) => setNewKeywords(e.target.value)}
          className={cx('input')}
        />
        <button onClick={handleAddIndustry} className={styles.addButton}>
          업종 추가
        </button>
      </div>
    </div>
  );
};

export default IndustryForm;
