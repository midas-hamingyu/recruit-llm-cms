import React, { useState } from 'react';
import styles from './IndustryForm.module.scss';
import {Industry} from "../../@typs/Industry.ts";

interface IndustryFormProps {
    industries: Industry[];
    onUpdateIndustries: (updatedIndustries: Industry[]) => void;
}

const IndustryForm: React.FC<IndustryFormProps> = ({ industries, onUpdateIndustries }) => {
    const [newIndustry, setNewIndustry] = useState<string>('');
    const [newKeyword, setNewKeyword] = useState<string>('');
    const [selectedIndustryIndex, setSelectedIndustryIndex] = useState<number | null>(null);

    const handleAddIndustry = () => {
        if (newIndustry.trim() && !industries.find((i) => i.name === newIndustry)) {
            onUpdateIndustries([...industries, { name: newIndustry, keywords: [] }]);
            setNewIndustry('');
        }
    };

    const handleAddKeyword = () => {
        if (selectedIndustryIndex !== null && newKeyword.trim()) {
            const updatedIndustries = [...industries];
            updatedIndustries[selectedIndustryIndex].keywords.push(newKeyword);
            onUpdateIndustries(updatedIndustries);
            setNewKeyword('');
        }
    };

    const handleDeleteKeyword = (industryIndex: number, keywordIndex: number) => {
        const updatedIndustries = [...industries];
        updatedIndustries[industryIndex].keywords.splice(keywordIndex, 1);
        onUpdateIndustries(updatedIndustries);
    };

    const handleDeleteIndustry = (industryIndex: number) => {
        const updatedIndustries = industries.filter((_, i) => i !== industryIndex);
        onUpdateIndustries(updatedIndustries);
        setSelectedIndustryIndex(null);
    };

    return (
        <div className={styles.container}>
            <h3>업종 관리</h3>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="새로운 업종 이름"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                />
                <button onClick={handleAddIndustry}>업종 추가</button>
            </div>
            <ul className={styles.list}>
                {industries.map((industry, index) => (
                    <li key={index} className={styles.listItem}>
                        <strong onClick={() => setSelectedIndustryIndex(index)}>
                            {industry.name}
                        </strong>
                        <button onClick={() => handleDeleteIndustry(index)}>삭제</button>
                        {selectedIndustryIndex === index && (
                            <div>
                                <h4>키워드 관리</h4>
                                <div>
                                    {industry.keywords.map((keyword, keywordIndex) => (
                                        <div key={keywordIndex} className={styles.keywordGroup}>
                                            <span>{keyword}</span>
                                            <button onClick={() => handleDeleteKeyword(index, keywordIndex)}>
                                                삭제
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        placeholder="새로운 키워드"
                                        value={newKeyword}
                                        onChange={(e) => setNewKeyword(e.target.value)}
                                    />
                                    <button onClick={handleAddKeyword}>키워드 추가</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndustryForm;