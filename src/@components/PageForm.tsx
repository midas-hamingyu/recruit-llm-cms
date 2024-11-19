import React, { useState } from 'react';
import {Page} from "../@typs/Page.ts";


interface PageFormProps {
    onAddPage: (page: Page) => void;
}

const PageForm: React.FC<PageFormProps> = ({ onAddPage }) => {
    const [page, setPage] = useState<Page>({
        pageSn: Date.now(), // 고유 번호
        pageJsonUrl: '', // 입력받을 JSON URL
        name: '',
        companyName: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddPage(page); // 새로운 페이지 추가
        setPage({
            pageSn: Date.now(),
            pageJsonUrl: '',
            name: '',
            companyName: '',
        }); // 폼 초기화
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>페이지 이름:</label>
                <input
                    type="text"
                    value={page.name}
                    onChange={(e) => setPage({ ...page, name: e.target.value })}
                />
            </div>
            <div>
                <label>기업명:</label>
                <input
                    type="text"
                    value={page.companyName}
                    onChange={(e) =>
                        setPage({ ...page, companyName: e.target.value })
                    }
                />
            </div>
            <div>
                <label>JSON URL:</label>
                <input
                    type="text"
                    value={page.pageJsonUrl}
                    onChange={(e) =>
                        setPage({ ...page, pageJsonUrl: e.target.value })
                    }
                />
            </div>
            <button type="submit">페이지 추가</button>
        </form>
    );
};

export default PageForm;