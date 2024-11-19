import React, { useState } from 'react';
import styles from './PageForm.module.scss';
import {Page} from "../../@typs/Page.ts";
import {Company} from "../../@typs/Company.ts";

interface PageFormProps {
    onAddPage: (page: Page) => void;
    companies: Company[];
}

const PageForm: React.FC<PageFormProps> = ({ onAddPage, companies }) => {
    const [page, setPage] = useState<Page>({
        pageSn: Date.now(),
        pageJsonUrl: '',
        name: '',
        companyName: '',
        Industry: [],
    });

    const handleCompanyChange = (companyName: string) => {
        const selectedCompany = companies.find((company) => company.name === companyName);
        setPage((prev) => ({
            ...prev,
            companyName,
            Industry: selectedCompany ? selectedCompany.Industry : [],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddPage(page);
        setPage({
            pageSn: Date.now(),
            pageJsonUrl: '',
            name: '',
            companyName: '',
            Industry: [],
        });
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h3 className={styles.title}>페이지 추가</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>JSON URL:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={page.pageJsonUrl}
                    onChange={(e) =>
                        setPage({...page, pageJsonUrl: e.target.value})
                    }
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>페이지 이름:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={page.name}
                    onChange={(e) => setPage({...page, name: e.target.value})}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>기업명:</label>
                <select
                    className={styles.select}
                    value={page.companyName}
                    onChange={(e) => handleCompanyChange(e.target.value)}
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
                                    {industry.keywords.map((keyword, index) => (
                                        <li key={index} className={styles.keywordItem}>
                                            {keyword}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button type="submit" className={styles.button}>
                페이지 추가
            </button>
        </form>
    );
};

export default PageForm;