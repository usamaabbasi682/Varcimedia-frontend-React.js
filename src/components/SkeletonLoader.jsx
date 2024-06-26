import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-12"><Skeleton height={20} /></div>
                <div className="col-md-10"><Skeleton height={20} /></div>
                <div className="col-md-2"></div>
                <div className="col-md-8"><Skeleton height={20} /></div>    
                <div className="col-md-4"></div>
                <div className="col-md-6"><Skeleton height={20} /></div>
                <div className="col-md-6"></div>
                <div className="col-md-4"><Skeleton height={20} /></div>
                 <div className="col-md-8"></div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12"><Skeleton height={20} /></div>
                <div className="col-md-10"><Skeleton height={20} /></div>
                <div className="col-md-2"></div>
                <div className="col-md-8"><Skeleton height={20} /></div>    
                <div className="col-md-4"></div>
                <div className="col-md-6"><Skeleton height={20} /></div>
                <div className="col-md-6"></div>
                <div className="col-md-4"><Skeleton height={20} /></div>
                 <div className="col-md-8"></div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12"><Skeleton height={20} /></div>
                <div className="col-md-10"><Skeleton height={20} /></div>
                <div className="col-md-2"></div>
                <div className="col-md-8"><Skeleton height={20} /></div>    
                <div className="col-md-4"></div>
                <div className="col-md-6"><Skeleton height={20} /></div>
                <div className="col-md-6"></div>
                <div className="col-md-4"><Skeleton height={20} /></div>
                 <div className="col-md-8"></div>
            </div>
        </>
    );
}

export default SkeletonLoader;