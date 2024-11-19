import React, { useState } from 'react';
import {Company} from "../../@typs/Company.ts";
import styles from './CompanyForm.module.scss';
import {Industry} from "../../@typs/Industry.ts";

interface CompanyFormProps {
    companies: Company[];
    industries: Industry[];
    onUpdateCompanies: (updatedCompanies: Company[]) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
                                                     companies,
                                                     industries,
                                                     onUpdateCompanies,
                                                 }) => {
    const [newCompany, setNewCompany] = useState<string>('');
    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<number | null>(null);

    const handleAddCompany = () => {
        if (newCompany.trim() && !companies.find((c) => c.name === newCompany)) {
            onUpdateCompanies([...companies, { name: newCompany, Industry: [] }]);
            setNewCompany('');
        }
    };

    const handleIndustryToggle = (companyIndex: number, industryName: string) => {
        const updatedCompanies = [...companies];
        const company = updatedCompanies[companyIndex];
        const isAlreadyIncluded = company.Industry.some((ind) => ind.name === industryName);

        if (isAlreadyIncluded) {
            // Remove the industry if it already exists
            company.Industry = company.Industry.filter((ind) => ind.name !== industryName);
        } else {
            // Add the industry
            const industryToAdd = industries.find((ind) => ind.name === industryName);
            if (industryToAdd) {
                company.Industry = [...company.Industry, industryToAdd];
            }
        }

        onUpdateCompanies(updatedCompanies);
    };

    const handleDeleteCompany = (index: number) => {
        const updatedCompanies = companies.filter((_, i) => i !== index);
        onUpdateCompanies(updatedCompanies);
        setSelectedCompanyIndex(null);
    };

    return (
        <div className={styles.container}>
            <h3>회사 관리</h3>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="새로운 회사 이름"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                />
                <button onClick={handleAddCompany}>회사 추가</button>
            </div>
            <ul className={styles.list}>
                {companies.map((company, index) => (
                    <li
                        key={index}
                        className={styles.listItem}
                        onClick={() => setSelectedCompanyIndex(index)}
                    >
                        <strong>{company.name}</strong>
                        <button onClick={() => handleDeleteCompany(index)}>삭제</button>
                        {selectedCompanyIndex === index && (
                            <div>
                                <h4>업종 선택</h4>
                                <ul className={styles.industryList}>
                                    {industries.map((industry) => (
                                        <li key={industry.name} className={styles.industryItem}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={company.Industry.some(
                                                        (ind) => ind.name === industry.name
                                                    )}
                                                    onChange={() =>
                                                        handleIndustryToggle(index, industry.name)
                                                    }
                                                />
                                                {industry.name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyForm;