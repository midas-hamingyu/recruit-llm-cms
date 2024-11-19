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
import IndustryForm from "../@components/IndustryForm/IndustryForm.tsx";
import {Industry} from "../@typs/Industry.ts";

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('jsonUpload');
    const [pages, setPages] = useState<Page[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [industries, setIndustries] = useState<Industry[]>([]);

    const addPage = (page: Page) => {
        setPages((prevPages) => [...prevPages, page]);
    };

    const updatePages = (updatedPages: Page[]) => {
        setPages(updatedPages);
    };

    const updateCompanies = (updatedCompanies: Company[]) => {
        setCompanies(updatedCompanies);
    };

    const updateIndustries = (updatedIndustries: Industry[]) => {
        setIndustries(updatedIndustries);
    };

    const handleFileUpload = (uploadedData: UploadedData) => {
        setPages(uploadedData.pages || []);
        setCompanies(uploadedData.companies || []);
        setIndustries(uploadedData.industries || []);
    };

    return (
        <div className={styles.app}>
            <h1>채용사이트 수집 데이터 변환기</h1>
            {/* Tabs Navigation */}
            <div className={styles.tabs}>
                <button
                    className={activeTab === 'jsonUpload' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('jsonUpload')}
                >
                    JSON 업로드
                </button>
                <button
                    className={activeTab === 'industry' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('industry')}
                >
                    업종 관리
                </button>
                <button
                    className={activeTab === 'company' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('company')}
                >
                    회사 관리
                </button>
                <button
                    className={activeTab === 'page' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('page')}
                >
                    페이지 관리
                </button>
                <button
                    className={activeTab === 'jsonPreview' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('jsonPreview')}
                >
                    JSON 미리보기
                </button>
            </div>

            {/* Tab Contents */}
            <div className={styles.tabContent}>
                {activeTab === 'jsonUpload' && <FileUploader onUpload={handleFileUpload} />}
                {activeTab === 'industry' && (
                    <IndustryForm industries={industries} onUpdateIndustries={updateIndustries} />
                )}
                {activeTab === 'company' && (
                    <CompanyForm
                        companies={companies}
                        industries={industries}
                        onUpdateCompanies={updateCompanies}
                    />
                )}
                {activeTab === 'page' && (
                    <>
                        <PageForm onAddPage={addPage} companies={companies} />
                        <EditablePageList
                            pages={pages}
                            companies={companies}
                            onUpdatePages={updatePages}
                        />
                    </>
                )}
                {activeTab === 'jsonPreview' && (
                    <JSONPreview pages={pages} companies={companies} industries={industries} />
                )}
            </div>
        </div>
    );
};

export default App;