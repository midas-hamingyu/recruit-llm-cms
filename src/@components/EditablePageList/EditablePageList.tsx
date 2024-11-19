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
        setEditPages(pages);
    }, [pages]);

    const handleCompanyChange = (index: number, companyName: string) => {
        const selectedCompany = companies.find((company) => company.name === companyName);
        const updatedPages = [...editPages];
        updatedPages[index].companyName = companyName;
        updatedPages[index].Industry = selectedCompany ? selectedCompany.Industry : [];
        setEditPages(updatedPages);
        onUpdatePage(updatedPages);
    };

    return (
        <div className={styles.container}>
            <h3>수정 가능한 페이지 리스트</h3>
            {editPages.map((page, index) => (
                <div key={page.pageSn} className={styles.pageItem}>
                    <div>
                        <label>기업명:</label>
                        <select
                            value={page.companyName}
                            onChange={(e) => handleCompanyChange(index, e.target.value)}
                        >
                            <option value="">선택하세요</option>
                            {companies.map((company) => (
                                <option key={company.name} value={company.name}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h4>업종</h4>
                        <ul>
                            {page.Industry.map((industry, industryIndex) => (
                                <li key={industryIndex}>
                                    <strong>{industry.name}</strong>: {industry.keywords.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditablePageList;