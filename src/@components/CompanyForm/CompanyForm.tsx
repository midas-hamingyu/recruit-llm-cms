import React, { useState } from 'react';
import {Company} from "../../@typs/Company.ts";
import classNames from 'classnames';
import styles from './CompanyForm.module.scss';

interface CompanyFormProps {
    companies: Company[];
    onUpdateCompanies: (updatedCompanies: Company[]) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ companies, onUpdateCompanies }) => {
    const [newCompany, setNewCompany] = useState<string>('');
    const [newIndustry, setNewIndustry] = useState<string>('');
    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<number | null>(null);

    const handleAddCompany = () => {
        if (newCompany.trim() && !companies.find((c) => c.name === newCompany)) {
            onUpdateCompanies([...companies, { name: newCompany, Industry: [] }]);
            setNewCompany('');
        }
    };

    const handleAddIndustry = () => {
        if (selectedCompanyIndex !== null && newIndustry.trim()) {
            const updatedCompanies = [...companies];
            updatedCompanies[selectedCompanyIndex].Industry.push(newIndustry);
            onUpdateCompanies(updatedCompanies);
            setNewIndustry('');
        }
    };

    const handleDeleteCompany = (index: number) => {
        const updatedCompanies = companies.filter((_, i) => i !== index);
        onUpdateCompanies(updatedCompanies);
        setSelectedCompanyIndex(null);
    };

    const handleDeleteIndustry = (industryIndex: number) => {
        if (selectedCompanyIndex !== null) {
            const updatedCompanies = [...companies];
            updatedCompanies[selectedCompanyIndex].Industry.splice(industryIndex, 1);
            onUpdateCompanies(updatedCompanies);
        }
    };

    return (
        <div className={styles.container}>
            <h3>회사와 업종 관리</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>새로운 회사:</label>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="회사 이름 입력"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleAddCompany}>
                        추가
                    </button>
                </div>
            </div>
            <ul className={styles.list}>
                {companies.map((company, index) => (
                    <li
                        key={index}
                        className={classNames(styles.listItem, {
                            [styles.selected]: selectedCompanyIndex === index,
                        })}
                        onClick={() => setSelectedCompanyIndex(index)}
                    >
                        <span>{company.name}</span>
                        <button
                            className={styles.deleteButton}
                            onClick={(e) => {
                                e.stopPropagation(); // 부모 클릭 이벤트 방지
                                handleDeleteCompany(index);
                            }}
                        >
                            삭제
                        </button>
                        {selectedCompanyIndex === index && (
                            <div>
                                <ul className={styles.industryList}>
                                    {company.Industry.map((industry, i) => (
                                        <li key={i} className={styles.industryItem}>
                                            <span>{industry}</span>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => handleDeleteIndustry(i)}
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>새로운 업종:</label>
                                    <div className={styles.inputGroup}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="업종 입력"
                                            value={newIndustry}
                                            onChange={(e) => setNewIndustry(e.target.value)}
                                        />
                                        <button
                                            className={styles.button}
                                            onClick={handleAddIndustry}
                                        >
                                            추가
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyForm;