import React, { useState } from 'react';
import styles from './EditablePageList.module.scss';
import {Industry} from "../../@typs/Industry.ts";
import {Page} from "../../@typs/Page.ts";

interface EditablePageListProps {
    pages: Page[];
    companies: { name: string; Industry: Industry[] }[];
    onUpdatePages: (updatedPages: Page[]) => void;
}

const EditablePageList: React.FC<EditablePageListProps> = ({
                                                               pages,
                                                               companies,
                                                               onUpdatePages,
                                                           }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleEditPage = (
        index: number,
        key: keyof Page,
        value: string
    ) => {
        const updatedPages = [...pages];
        updatedPages[index] = { ...updatedPages[index], [key]: value }; // 개별 키 업데이트
        onUpdatePages(updatedPages); // 부모 컴포넌트로 업데이트 전달
    };

    const handleDeletePage = (index: number) => {
        const updatedPages = pages.filter((_, i) => i !== index);
        onUpdatePages(updatedPages);
    };

    const getCompanyIndustries = (companyName: string) => {
        const company = companies.find((c) => c.name === companyName);
        return company ? company.Industry : [];
    };

    return (
        <div className={styles.container}>
            <h3>페이지 리스트</h3>
            <div className={styles.pageList}>
                {pages.map((page, index) => (
                    <div key={index} className={styles.pageCard}>
                        {expandedIndex === index ? (
                            <div className={styles.pageDetails}>
                                <label className={styles.label}>
                                    페이지 이름
                                    <input
                                        type="text"
                                        value={page.name}
                                        onChange={(e) =>
                                            handleEditPage(index, 'name', e.target.value)
                                        }
                                        className={styles.input}
                                    />
                                </label>
                                <label className={styles.label}>
                                    JSON URL
                                    <input
                                        type="text"
                                        value={page.pageJsonUrl}
                                        onChange={(e) =>
                                            handleEditPage(index, 'pageJsonUrl', e.target.value)
                                        }
                                        className={styles.input}
                                    />
                                </label>
                                <label className={styles.label}>
                                    회사명
                                    <select
                                        value={page.companyName}
                                        onChange={(e) =>
                                            handleEditPage(index, 'companyName', e.target.value)
                                        }
                                        className={styles.select}
                                    >
                                        <option value="">회사 선택</option>
                                        {companies.map((company) => (
                                            <option key={company.name} value={company.name}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <div className={styles.companyDetails}>
                                    <p>업종:</p>
                                    <ul>
                                        {getCompanyIndustries(page.companyName).map((industry) => (
                                            <li key={industry.name}>
                                                {industry.name} - 키워드: {industry.keywords.join(', ')}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button
                                        onClick={() => setExpandedIndex(null)}
                                        className={styles.cancelButton}
                                    >
                                        닫기
                                    </button>
                                    <button
                                        onClick={() => handleDeletePage(index)}
                                        className={styles.deleteButton}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={styles.pageSummary}
                                onClick={() => setExpandedIndex(index)}
                            >
                                <h4>{page.name}</h4>
                                <p>회사명: {page.companyName}</p>
                                <p>URL: {page.pageJsonUrl}</p>
                                <div className={styles.companyDetails}>
                                    <p>업종:</p>
                                    <ul>
                                    {getCompanyIndustries(page.companyName).map((industry) => (
                                            <li key={industry.name}>
                                                {industry.name} - 키워드: {industry.keywords.join(', ')}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditablePageList;