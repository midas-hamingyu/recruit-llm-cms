import React, { useState } from 'react';
import styles from './PageForm.module.scss';
import {Page} from "../../@typs/Page.ts";
import {Company} from "../../@typs/Company.ts";

interface PageFormProps {
    onAddPage: (page: Page) => void;
    companies: Company[];
    nextPageSn: number; // 다음 pageSn 값을 부모에서 관리
}

const PageForm: React.FC<PageFormProps> = ({ onAddPage, companies, nextPageSn }) => {
    const [name, setName] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [pageJsonUrl, setPageJsonUrl] = useState<string>('');

    // 선택된 회사 정보
    const selectedCompany = companies.find((company) => company.name === companyName);

    // 페이지 추가 함수
    const handleAddPage = () => {
        if (name && companyName && pageJsonUrl && selectedCompany) {
            const newPage: Page = {
                pageSn: nextPageSn,
                pageJsonUrl,
                name,
                companyName,
                Industry: selectedCompany.Industry, // 회사의 업종을 추가
            };

            // 부모 컴포넌트로 페이지 전달
            onAddPage(newPage);

            // 입력 필드 초기화
            setName('');
            setCompanyName('');
            setPageJsonUrl('');
        }
    };

    return (
        <div className={styles.container}>
            <h3>페이지 추가</h3>
            <div className={styles.formGroup}>
                <label className={styles.label}>
                    페이지 이름
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="페이지 이름 입력"
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    JSON URL
                    <input
                        type="text"
                        value={pageJsonUrl}
                        onChange={(e) => setPageJsonUrl(e.target.value)}
                        placeholder="JSON URL 입력"
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    회사명
                    <select
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
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
                {selectedCompany && (
                    <div className={styles.companyDetails}>
                        <p>업종:</p>
                        <ul>
                            {selectedCompany.Industry.map((industry) => (
                                <li key={industry.name}>
                                    {industry.name} - 키워드: {industry.keywords.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={handleAddPage} className={styles.addButton}>
                    페이지 추가
                </button>
            </div>
        </div>
    );
};

export default PageForm;