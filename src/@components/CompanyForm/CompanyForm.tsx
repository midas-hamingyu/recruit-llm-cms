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
    const [newCompanyName, setNewCompanyName] = useState<string>('');
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleAddCompany = () => {
        if (newCompanyName.trim() && selectedIndustries.length > 0) {
            const industriesForCompany = industries.filter((industry) =>
                selectedIndustries.includes(industry.name)
            );

            const newCompany: Company = {
                name: newCompanyName,
                Industry: industriesForCompany,
            };

            onUpdateCompanies([...companies, newCompany]);
            setNewCompanyName('');
            setSelectedIndustries([]);
        }
    };

    const handleToggleIndustryForCompany = (companyIndex: number, industryName: string) => {
        const updatedCompanies = [...companies];
        const company = updatedCompanies[companyIndex];
        const isAlreadySelected = company.Industry.some(
            (industry) => industry.name === industryName
        );

        if (isAlreadySelected) {
            company.Industry = company.Industry.filter(
                (industry) => industry.name !== industryName
            );
        } else {
            const newIndustry = industries.find((industry) => industry.name === industryName);
            if (newIndustry) {
                company.Industry = [...company.Industry, newIndustry];
            }
        }

        onUpdateCompanies(updatedCompanies);
    };

    const handleDeleteCompany = (index: number) => {
        const updatedCompanies = companies.filter((_, i) => i !== index);
        onUpdateCompanies(updatedCompanies);
    };

    return (
        <div className={styles.container}>
            <h3>회사 관리</h3>

            {/* 회사 추가 */}
            <div className={styles.addCompany}>
                <input
                    type="text"
                    placeholder="회사 이름 입력"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.industryCheckboxes}>
                    {industries.map((industry) => (
                        <label key={industry.name} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedIndustries.includes(industry.name)}
                                onChange={() =>
                                    setSelectedIndustries((prev) =>
                                        prev.includes(industry.name)
                                            ? prev.filter((name) => name !== industry.name)
                                            : [...prev, industry.name]
                                    )
                                }
                                className={styles.checkbox}
                            />
                            {industry.name}
                            <span className={styles.industryKeywords}>
                ({industry.keywords.join(', ')})
              </span>
                        </label>
                    ))}
                </div>
                <button onClick={handleAddCompany} className={styles.addButton}>
                    회사 추가
                </button>
            </div>

            {/* 회사 리스트 */}
            <div className={styles.companyList}>
                {companies.map((company, index) => (
                    <div key={index} className={styles.companyCard}>
                        {expandedIndex === index ? (
                            <div className={styles.companyDetails}>
                                <input
                                    type="text"
                                    value={company.name}
                                    onChange={(e) => {
                                        const updatedCompanies = [...companies];
                                        updatedCompanies[index].name = e.target.value;
                                        onUpdateCompanies(updatedCompanies);
                                    }}
                                    className={styles.input}
                                />
                                <div className={styles.industryCheckboxes}>
                                    {industries.map((industry) => (
                                        <label key={industry.name} className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={company.Industry.some(
                                                    (ind) => ind.name === industry.name
                                                )}
                                                onChange={() =>
                                                    handleToggleIndustryForCompany(index, industry.name)
                                                }
                                                className={styles.checkbox}
                                            />
                                            {industry.name}
                                            <span className={styles.industryKeywords}>
                        ({industry.keywords.join(', ')})
                      </span>
                                        </label>
                                    ))}
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button
                                        onClick={() => setExpandedIndex(null)}
                                        className={styles.cancelButton}
                                    >
                                        닫기
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCompany(index)}
                                        className={styles.deleteButton}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={styles.companySummary}
                                onClick={() => setExpandedIndex(index)}
                            >
                                <h4>{company.name}</h4>
                                <p>
                                    업종: {company.Industry.map((ind) => ind.name).join(', ') || '없음'}
                                </p>
                                <p>
                                    키워드: {company.Industry.map((ind) => ind.keywords.join(', ')).join('; ') || '없음'}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyForm;