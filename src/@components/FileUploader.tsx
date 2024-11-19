import React from 'react';
import {Page} from "../@typs/Page.ts";

interface FileUploaderProps {
    onUpload: (pages: Page[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const json = JSON.parse(reader.result as string);
                if (json.pageList && Array.isArray(json.pageList)) {
                    onUpload(json.pageList);
                } else {
                    alert('올바른 JSON 파일 형식이 아닙니다.');
                }
            } catch (error) {
                alert('JSON 파일을 파싱하는 중 오류가 발생했습니다.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <h3>JSON 업로드</h3>
            <input type="file" accept="application/json" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUploader;