import React, { useState } from 'react';
import styles from './IndustryForm.module.scss';
import {Industry} from "../../@typs/Industry.ts";

interface IndustryFormProps {
    industries: Industry[];
    onUpdateIndustries: (updatedIndustries: Industry[]) => void;
}

const IndustryForm: React.FC<IndustryFormProps> = ({ industries, onUpdateIndustries }) => {
    const [newIndustry, setNewIndustry] = useState<string>('');

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

    const handleKeywordChange = (
        industryIndex: number,
        keywordIndex: number,
        newKeyword: string
    ) => {
        const updatedIndustries = [...industries];
        updatedIndustries[industryIndex].keywords[keywordIndex] = newKeyword;
        onUpdateIndustries(updatedIndustries);
    };

    const handleAddKeyword = (industryIndex: number, newKeyword: string) => {
        if (!newKeyword.trim()) return;

        const updatedIndustries = [...industries];
        const industry = updatedIndustries[industryIndex];

        if (!industry.keywords.includes(newKeyword)) {
            industry.keywords.push(newKeyword);
            onUpdateIndustries(updatedIndustries);
        }
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
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={(e) =>
                                                handleKeywordChange(industryIndex, keywordIndex, e.target.value)
                                            }
                                            className={styles.keywordInput}
                                        />
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
                            <div className={styles.addKeyword}>
                                <input
                                    type="text"
                                    placeholder="새로운 키워드"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddKeyword(industryIndex, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                    className={styles.input}
                                />
                                <button
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        handleAddKeyword(industryIndex, input.value);
                                        input.value = '';
                                    }}
                                    className={styles.addButton}
                                >
                                    추가
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