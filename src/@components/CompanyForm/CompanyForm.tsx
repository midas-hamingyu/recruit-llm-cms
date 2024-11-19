import React, { useState } from 'react';
import styles from './CompanyForm.module.scss';
import {Company} from "../../@typs/Company.ts";
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

    const handleAddCompany = () => {
        if (newCompany.trim() && !companies.find((c) => c.name === newCompany)) {
            onUpdateCompanies([...companies, { name: newCompany, Industry: [] }]);
            setNewCompany('');
        }
    };

    const handleDeleteCompany = (index: number) => {
        const updatedCompanies = companies.filter((_, i) => i !== index);
        onUpdateCompanies(updatedCompanies);
    };

    const handleEditCompanyName = (index: number, newName: string) => {
        const updatedCompanies = [...companies];
        updatedCompanies[index].name = newName;
        onUpdateCompanies(updatedCompanies);
    };

    const handleIndustryToggle = (companyIndex: number, industryName: string) => {
        const updatedCompanies = [...companies];
        const company = updatedCompanies[companyIndex];
        const isAlreadyIncluded = company.Industry.some((ind) => ind.name === industryName);

        if (isAlreadyIncluded) {
            // Remove the industry
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

    return (
        <div className={styles.container}>
            <h3>회사 관리</h3>
            {/* Add New Company */}
            <div className={styles.addCompany}>
                <input
                    type="text"
                    placeholder="새로운 회사 이름"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleAddCompany} className={styles.addButton}>
                    회사 추가
                </button>
            </div>

            {/* Company List */}
            <div className={styles.companyList}>
                {companies.map((company, index) => (
                    <div key={index} className={styles.companyItem}>
                        {/* Company Header */}
                        <div className={styles.companyHeader}>
                            <input
                                type="text"
                                value={company.name}
                                onChange={(e) => handleEditCompanyName(index, e.target.value)}
                                className={styles.companyNameInput}
                            />
                            <button
                                onClick={() => handleDeleteCompany(index)}
                                className={styles.deleteButton}
                            >
                                삭제
                            </button>
                        </div>

                        {/* Industry Selection */}
                        <div className={styles.industrySection}>
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
                                                onChange={() => handleIndustryToggle(index, industry.name)}
                                            />
                                            {industry.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyForm;