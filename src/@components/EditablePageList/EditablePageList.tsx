import React, { useState, useEffect } from 'react';
import styles from './EditablePageList.module.scss';
import {Page} from "../../@typs/Page.ts";
import {Company} from "../../@typs/Company.ts";

interface EditablePageListProps {
    pages: Page[];
    companies: Company[];
    onUpdatePage: (updatedPages: Page[]) => void;
}

const EditablePageList: React.FC<EditablePageListProps> = ({ pages, companies, onUpdatePage }) => {
    const [editPages, setEditPages] = useState<Page[]>(pages);

    useEffect(() => {
        setEditPages(pages);
    }, [pages]);

    const handleInputChange = (
        index: number,
        field: keyof Page,
        value: string | number
    ) => {
        const updatedPages = [...editPages];
        updatedPages[index] = { ...updatedPages[index], [field]: value };

        if (field === 'companyName') {
            const selectedCompany = companies.find((company) => company.name === value);
            updatedPages[index].Industry = selectedCompany ? selectedCompany.Industry : [];
        }

        setEditPages(updatedPages);
        onUpdatePage(updatedPages);
    };

    const handleDelete = (index: number) => {
        const updatedPages = [...editPages];
        updatedPages.splice(index, 1);
        setEditPages(updatedPages);
        onUpdatePage(updatedPages);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>페이지 리스트 관리</h3>
            {editPages.map((page, index) => (
                <div key={page.pageSn} className={styles.pageItem}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>JSON URL:</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={page.pageJsonUrl}
                            onChange={(e) =>
                                handleInputChange(index, 'pageJsonUrl', e.target.value)
                            }
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>페이지 이름:</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={page.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>기업명:</label>
                        <select
                            className={styles.select}
                            value={page.companyName}
                            onChange={(e) =>
                                handleInputChange(index, 'companyName', e.target.value)
                            }
                        >
                            <option value="">선택하세요</option>
                            {companies.map((company) => (
                                <option key={company.name} value={company.name}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {page.companyName && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>업종 및 키워드:</label>
                            <ul className={styles.industryList}>
                                {page.Industry.map((industry) => (
                                    <li key={industry.name} className={styles.industryItem}>
                                        <div className={styles.industryName}>{industry.name}</div>
                                        <ul className={styles.keywordList}>
                                            {industry.keywords.map((keyword, idx) => (
                                                <li key={idx} className={styles.keywordItem}>
                                                    {keyword}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(index)}
                    >
                        삭제
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EditablePageList;