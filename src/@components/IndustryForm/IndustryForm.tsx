import React, { useState } from 'react';
import styles from './IndustryForm.module.scss';
import {Industry} from "../../@typs/Industry.ts";

interface IndustryFormProps {
    industries: Industry[];
    onUpdateIndustries: (updatedIndustries: Industry[]) => void;
}

const IndustryForm: React.FC<IndustryFormProps> = ({ industries, onUpdateIndustries }) => {
    const [newIndustry, setNewIndustry] = useState<string>('');
    const [bulkKeywords, setBulkKeywords] = useState<{ [key: number]: string }>({});

    const handleAddIndustry = () => {
        if (newIndustry.trim() && !industries.find((i) => i.name === newIndustry)) {
            onUpdateIndustries([...industries, { name: newIndustry, keywords: [] }]);
            setNewIndustry('');
        }
    };

    const handleDeleteIndustry = (index: number) => {
        const updatedIndustries = industries.filter((_, i) => i !== index);
        onUpdateIndustries(updatedIndustries);
    };

    const handleEditIndustryName = (index: number, newName: string) => {
        const updatedIndustries = [...industries];
        updatedIndustries[index].name = newName;
        onUpdateIndustries(updatedIndustries);
    };

    const handleAddBulkKeywords = (industryIndex: number) => {
        const keywordsString = bulkKeywords[industryIndex] || '';
        if (!keywordsString.trim()) return;

        const keywordsArray = keywordsString
            .split(',') // 콤마로만 분리
            .map((keyword) => keyword.trim()) // 앞뒤 공백 제거
            .filter((keyword) => keyword.length > 0); // 빈 키워드 제거

        const updatedIndustries = [...industries];
        const industry = updatedIndustries[industryIndex];

        industry.keywords = [...new Set([...industry.keywords, ...keywordsArray])]; // 중복 제거
        onUpdateIndustries(updatedIndustries);

        // 특정 업종의 키워드 입력 필드만 초기화
        setBulkKeywords((prev) => ({
            ...prev,
            [industryIndex]: '',
        }));
    };

    const handleDeleteKeyword = (industryIndex: number, keywordIndex: number) => {
        const updatedIndustries = [...industries];
        updatedIndustries[industryIndex].keywords.splice(keywordIndex, 1);
        onUpdateIndustries(updatedIndustries);
    };

    return (
        <div className={styles.container}>
            <h3>업종 관리</h3>
            {/* Add New Industry */}
            <div className={styles.addIndustry}>
                <input
                    type="text"
                    placeholder="새로운 업종 이름"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleAddIndustry} className={styles.addButton}>
                    업종 추가
                </button>
            </div>

            {/* Industry List */}
            <div className={styles.industryList}>
                {industries.map((industry, industryIndex) => (
                    <div key={industryIndex} className={styles.industryItem}>
                        {/* Editable Industry Name */}
                        <div className={styles.industryHeader}>
                            <input
                                type="text"
                                value={industry.name}
                                onChange={(e) =>
                                    handleEditIndustryName(industryIndex, e.target.value)
                                }
                                className={styles.industryNameInput}
                            />
                            <button
                                onClick={() => handleDeleteIndustry(industryIndex)}
                                className={styles.deleteButton}
                            >
                                삭제
                            </button>
                        </div>

                        {/* Keyword Section */}
                        <div className={styles.keywordSection}>
                            <h4>키워드</h4>
                            <ul className={styles.keywordList}>
                                {industry.keywords.map((keyword, keywordIndex) => (
                                    <li key={keywordIndex} className={styles.keywordItem}>
                                        {keyword}
                                        <button
                                            onClick={() =>
                                                handleDeleteKeyword(industryIndex, keywordIndex)
                                            }
                                            className={styles.deleteButton}
                                        >
                                            삭제
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.bulkKeywordInputGroup}>
                                <input
                                    type="text"
                                    placeholder="키워드 입력 (콤마로 구분)"
                                    value={bulkKeywords[industryIndex] || ''}
                                    onChange={(e) =>
                                        setBulkKeywords((prev) => ({
                                            ...prev,
                                            [industryIndex]: e.target.value,
                                        }))
                                    }
                                    className={styles.input}
                                />
                                <button
                                    onClick={() => handleAddBulkKeywords(industryIndex)}
                                    className={styles.addButton}
                                >
                                    키워드 추가
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndustryForm;