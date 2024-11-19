import React, { useState } from 'react';
import {Page} from "../../@typs/Page.ts";
import {Company} from "../../@typs/Company.ts";
import classNames from 'classnames';
import styles from './PageForm.module.scss';

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
            <div className={styles.formGroup}>
                <label className={styles.label}>페이지 이름:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={page.name}
                    onChange={(e) => setPage({ ...page, name: e.target.value })}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>기업명:</label>
                <select
                    className={classNames(styles.input, styles.select)}
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
            <div className={styles.formGroup}>
                <label className={styles.label}>JSON URL:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={page.pageJsonUrl}
                    onChange={(e) => setPage({ ...page, pageJsonUrl: e.target.value })}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>업종 리스트:</label>
                <ul className={styles.industryList}>
                    {page.Industry.map((industry, index) => (
                        <li key={index} className={styles.industryItem}>
                            {industry}
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit" className={styles.button}>
                페이지 추가
            </button>
        </form>
    );
};

export default PageForm;