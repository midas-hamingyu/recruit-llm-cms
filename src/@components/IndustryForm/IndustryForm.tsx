import React, { useState } from 'react';
import styles from './IndustryForm.module.scss';
import {Industry} from "../../@typs/Industry.ts";

interface IndustryFormProps {
    industries: Industry[];
    onUpdateIndustries: (updatedIndustries: Industry[]) => void;
}

const IndustryForm: React.FC<IndustryFormProps> = ({ industries, onUpdateIndustries }) => {
    const [newIndustry, setNewIndustry] = useState<string>('');
    const [newKeywords, setNewKeywords] = useState<string>('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [additionalKeyword, setAdditionalKeyword] = useState<string>('');

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

    const handleEditIndustryName = (index: number, newName: string) => {
        const updatedIndustries = [...industries];
        updatedIndustries[index].name = newName;
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

    const handleDeleteKeyword = (index: number, keywordIndex: number) => {
        const updatedIndustries = [...industries];
        updatedIndustries[index].keywords.splice(keywordIndex, 1);
        onUpdateIndustries(updatedIndustries);
    };

    const handleDeleteIndustry = (index: number) => {
        const updatedIndustries = industries.filter((_, i) => i !== index);
        onUpdateIndustries(updatedIndustries);
    };

    return (
        <div className={styles.container}>
            <h3>업종 관리</h3>
            <div className={styles.addIndustry}>
                <input
                    type="text"
                    placeholder="새로운 업종 이름"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="키워드 입력 (콤마로 구분)"
                    value={newKeywords}
                    onChange={(e) => setNewKeywords(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleAddIndustry} className={styles.addButton}>
                    업종 추가
                </button>
            </div>

            <div className={styles.industryList}>
                {industries.map((industry, index) => (
                    <div key={index} className={styles.industryCard}>
                        {expandedIndex === index ? (
                            <div className={styles.industryDetails}>
                                <input
                                    type="text"
                                    value={industry.name}
                                    onChange={(e) =>
                                        handleEditIndustryName(index, e.target.value)
                                    }
                                    className={styles.input}
                                />
                                <ul className={styles.keywordList}>
                                    {industry.keywords.map((keyword, keywordIndex) => (
                                        <li key={keywordIndex} className={styles.keywordItem}>
                                            {keyword}
                                            <button
                                                onClick={() => handleDeleteKeyword(index, keywordIndex)}
                                                className={styles.deleteButton}
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.addKeywords}>
                                    <input
                                        type="text"
                                        placeholder="추가 키워드 입력 (콤마로 구분)"
                                        value={additionalKeyword}
                                        onChange={(e) => setAdditionalKeyword(e.target.value)}
                                        className={styles.inputInline}
                                    />
                                    <button
                                        onClick={() => handleAddKeywords(index)}
                                        className={styles.addButtonInline}
                                    >
                                        추가
                                    </button>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button
                                        onClick={() => setExpandedIndex(null)}
                                        className={styles.cancelButton}
                                    >
                                        닫기
                                    </button>
                                    <button
                                        onClick={() => handleDeleteIndustry(index)}
                                        className={styles.deleteButton}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={styles.industrySummary}
                                onClick={() => setExpandedIndex(index)}
                            >
                                <h4>{industry.name}</h4>
                                <p>키워드: {industry.keywords.join(', ') || '없음'}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndustryForm;