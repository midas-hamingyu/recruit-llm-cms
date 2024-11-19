import React, {useEffect, useState} from 'react';
import {Page} from "../../@typs/Page.ts";
import styles from './EditablePageList.module.scss';
import {Company} from "../../@typs/Company.ts";

interface EditablePageListProps {
    pages: Page[];
    companies: Company[];
    onUpdatePage: (updatedPages: Page[]) => void;
}

const EditablePageList: React.FC<EditablePageListProps> = ({ pages, companies, onUpdatePage }) => {
    const [editPages, setEditPages] = useState<Page[]>(pages);

    useEffect(() => {
        setEditPages(pages); // 부모 상태 변경 시 동기화
    }, [pages]);

    const handleInputChange = (
        index: number,
        field: keyof Page,
        value: string | number
    ) => {
        const updatedPages = [...editPages];
        updatedPages[index] = { ...updatedPages[index], [field]: value };
        setEditPages(updatedPages);
        onUpdatePage(updatedPages); // 부모 컴포넌트에 업데이트 전달
    };

    const handleDelete = (index: number) => {
        const updatedPages = [...editPages];
        updatedPages.splice(index, 1);
        setEditPages(updatedPages);
        onUpdatePage(updatedPages);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>수정 가능한 페이지 리스트</h3>
            {editPages.map((page, index) => (
                <div key={page.pageSn} className={styles.pageItem}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>페이지 이름:</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={page.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
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
                    <div className={styles.inputGroup}>
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
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>업종 리스트:</label>
                        <ul>
                            {page.Industry.map((industry, idx) => (
                                <li key={idx}>{industry}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className={styles.button}
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