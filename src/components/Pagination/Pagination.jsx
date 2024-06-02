const Pagination = ({ users, setPage,page }) => {
    const pageClick = (url) => {
        if (url != null) {
            const pageValue = url.match(/page=(\d+)/)[1];
            setPage(pageValue);   
        }
    }
    return (
        <>
            <ul className="pagination">
                {/* {
                    users?.meta?.from != page ? 
                    <li className={'page-item'}>
                            <a style={{ margin: '0 2px', padding: '5px 10px'}} href="javascript:void(0)" onClick={(e) => { e.preventDefault(); setPage(page - 1); }} className="page-link">Previous</a>
                    </li> : ''    
                } */}
                {
                    users?.meta?.links?.map((link, index) => {
                        return (
                            <>
                                {/* {link.label == '&laquo; Previous' || link.label == 'Next &raquo;' ? */}
                                    {/* '' : */}
                                <li key={index} className={link.active ? 'page-item active' : 'page-item'}>
                                    <a  style={{ margin: '0 0px', padding: '5px 10px'}} href={'?page=' + link.label} onClick={(e) => { e.preventDefault(); pageClick(link.url); }} className="page-link">{link.label}</a>
                                </li>
                                {/* } */}
                            </>
                        )
                    })
                }
                {/* {
                    users?.meta?.last_page != page ? 
                    <li className={'page-item'}>
                        <a style={{ margin: '0 2px', padding: '5px 10px'}} href="javascript:void(0)" onClick={(e) => { e.preventDefault(); setPage(page + 1); }} className="page-link">Next</a>
                    </li> : ''    
                } */}
            </ul>
        </>
    );
}

export default Pagination;