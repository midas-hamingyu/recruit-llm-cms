import './normalize.scss';
import {Page} from "../@typs/Page.ts";
import {useState} from "react";
import PageForm from "../@components/PageForm.tsx";
import JSONPreview from "../@components/JSONPreview.tsx";
import FileUploader from "../@components/FileUploader.tsx";
import EditablePageList from "../@components/EditablePageList.tsx";

const App: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([]);

    // 새로운 페이지 추가
    const addPage = (page: Page) => {
        setPages((prevPages) => [...prevPages, page]); // 기존 페이지 리스트에 추가
    };

    // 페이지 업데이트
    const updatePages = (updatedPages: Page[]) => {
        setPages(updatedPages); // 전체 페이지 리스트 업데이트
    };

    // JSON 업로드
    const handleUpload = (uploadedPages: Page[]) => {
        if (
            confirm(
                '기존 데이터를 유지하면서 병합하시겠습니까? 아니면 데이터를 덮어씁니다.'
            )
        ) {
            setPages((prevPages) => [...prevPages, ...uploadedPages]); // 병합
        } else {
            setPages(uploadedPages); // 덮어쓰기
        }
    };

    return (
        <div className="app">
            <h1>JSON CMS</h1>
            {/* 페이지 추가 폼 */}
            <PageForm onAddPage={addPage} />

            {/* 수정 가능한 페이지 리스트 */}
            <EditablePageList pages={pages} onUpdatePage={updatePages} />

            {/* JSON 업로드 */}
            <FileUploader onUpload={handleUpload} />

            {/* JSON 미리보기 */}
            <JSONPreview pages={pages} />
        </div>
    );
};

export default App;