import './normalize.scss';
import styles from './App.module.scss';
import {Page} from "../@typs/Page.ts";
import {useState} from "react";
import PageForm from "../@components/PageForm/PageForm.tsx";
import JSONPreview from "../@components/JSONPreview.tsx";
import EditablePageList from "../@components/EditablePageList/EditablePageList.tsx";
import CompanyForm from "../@components/CompanyForm/CompanyForm.tsx";
import {Company} from "../@typs/Company.ts";
import {UploadedData} from "../@typs/UploadedData.ts";
import FileUploader from "../@components/FileUploader/FileUploader.tsx";

const App: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    const addPage = (page: Page) => {
        setPages((prevPages) => [...prevPages, page]);
    };

    const updatePages = (updatedPages: Page[]) => {
        setPages(updatedPages);
    };

    const updateCompanies = (updatedCompanies: Company[]) => {
        setCompanies(updatedCompanies);
    };

    const handleFileUpload = (uploadedData: UploadedData) => {
        setPages(uploadedData.pages || []);
        setCompanies(uploadedData.companies || []);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>JSON CMS</h1>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>회사 관리</h2>
                <CompanyForm companies={companies} onUpdateCompanies={updateCompanies} />
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>페이지 추가</h2>
                <PageForm onAddPage={addPage} companies={companies} />
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>페이지 리스트</h2>
                <EditablePageList pages={pages} companies={companies} onUpdatePage={updatePages} />
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>JSON 업로드</h2>
                <FileUploader onUpload={handleFileUpload} />
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>JSON 미리보기</h2>
                <JSONPreview pages={pages} companies={companies} />
            </div>
        </div>
    );
};

export default App;