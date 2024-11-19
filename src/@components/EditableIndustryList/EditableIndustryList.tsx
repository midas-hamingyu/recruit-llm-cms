import { Industry } from '../../@typs/Industry.ts';
import styles from './EditableIndustryList.module.scss';
import React, { useState } from 'react';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface EditableIndustryListProps {
  industries: Industry[];
  onUpdateIndustries: (industries: Industry[]) => void;
}

const EditableIndustryList: React.FC<EditableIndustryListProps> = ({
  industries,
  onUpdateIndustries,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [additionalKeyword, setAdditionalKeyword] = useState<string>('');

  const handleEditIndustryName = (index: number, newName: string) => {
    const updatedIndustries = [...industries];
    updatedIndustries[index].name = newName;
    onUpdateIndustries(updatedIndustries);
  };

  const handleDeleteKeyword = (index: number, keywordIndex: number) => {
    const updatedIndustries = [...industries];
    updatedIndustries[index].keywords.splice(keywordIndex, 1);
    onUpdateIndustries(updatedIndustries);
  };

  const handleAddKeywords = (index: number) => {
    if (!additionalKeyword.trim()) return;

    const keywordsArray = additionalKeyword
      .split(',')
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);

    const updatedIndustries = [...industries];
    updatedIndustries[index].keywords = [
      ...new Set([...updatedIndustries[index].keywords, ...keywordsArray]),
    ];
    onUpdateIndustries(updatedIndustries);
    setAdditionalKeyword('');
  };

  const handleDeleteIndustry = (index: number) => {
    const updatedIndustries = industries.filter((_, i) => i !== index);
    onUpdateIndustries(updatedIndustries);
  };

  return (
    <div className={cx('industry-list')}>
      {industries.map((industry, index) => (
        <div key={index} className={cx('industry-card')}>
          {expandedIndex === index ? (
            <div className={cx('industry-details')}>
              <input
                type="text"
                value={industry.name}
                onChange={(e) => handleEditIndustryName(index, e.target.value)}
                className={styles.input}
              />
              <ul className={cx('keyword-list')}>
                {industry.keywords.map((keyword, keywordIndex) => (
                  <li key={keywordIndex} className={cx('keyword-item')}>
                    {keyword}
                    <button
                      onClick={() => handleDeleteKeyword(index, keywordIndex)}
                      className={cx('delete-button')}>
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
              <div className={cx('add-keywords')}>
                <input
                  type="text"
                  placeholder="추가 키워드 입력 (콤마로 구분)"
                  value={additionalKeyword}
                  onChange={(e) => setAdditionalKeyword(e.target.value)}
                  className={cx('input')}
                />
                <button
                  onClick={() => handleAddKeywords(index)}
                  className={cx('add-button')}>
                  추가
                </button>
              </div>
              <button
                onClick={() => setExpandedIndex(null)}
                className={cx('cancel-button')}>
                닫기
              </button>
            </div>
          ) : (
            <div
              className={cx('industry-summary')}
              onClick={() => setExpandedIndex(index)}>
              <p>
                <strong>{industry.name}</strong>
                <ul>
                  {industry.keywords.map((keyword) => (
                    <li>{keyword}</li>
                  ))}
                </ul>
              </p>
              <button
                onClick={() => handleDeleteIndustry(index)}
                className={cx('delete-button')}>
                삭제
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditableIndustryList;
