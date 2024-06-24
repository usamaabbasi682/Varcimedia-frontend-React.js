import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectLists } from "features/projectSlice";
import "../assets/css/insight.css";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Insight = ({status}) => {
    const dispatch = useDispatch();
    const {projects,isLoading} = useSelector((state) => state.projectStore);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        dispatch(projectLists({ search: search, work_status:status, page: page }));
    },[status]);
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        !isLoading ?
                        projects?.data?.map?.((project, index) => {
                            return (
                                <>
                                    <div className="col-lg-4">
                                        <div className="card card-margin">
                                            <div className="card-header no-border">
                                                <h5 className="card-title">{ project.name}</h5>
                                            </div>
                                            <div className="card-body pt-0">
                                                <div className="widget-49">
                                                    <div className="widget-49-title-wrapper">
                                                        <div className={project.work_status == 'completed' ? 'widget-49-date-success' : 'widget-49-date-warning' }>
                                                            <span className="widget-49-date-day">
                                                                { project.work_status == 'completed' ? <i className="fa fa-check-circle" /> : <i className="fa fa-spinner" /> }
                                                            </span>
                                                        </div>
                                                        <div className="widget-49-meeting-info">
                                                            <span className="widget-49-pro-title">
                                                                { project?.title }
                                                            </span>
                                                            <span className="widget-49-meeting-time">
                                                            End Date:  { project?.end_date }
                                                            </span>
                                                        </div>
                                                    </div>
                                                        <ol className="widget-49-meeting-points">
                                                        {
                                                            project?.users?.map?.((user, userIndex) => {
                                                                return (
                                                                    <>
                                                                    <li className="widget-49-meeting-item">
                                                                        <span>{user.full_name} & Role is {user.role}</span>
                                                                    </li>
                                                                    </>
                                                                );
                                                            })
                                                        }
                                                    </ol>
                                                    <div className="widget-49-meeting-action">
                                                        <Link to={`/admin/project-discussion/${project.id}`} className={project.work_status == 'completed' ? 'btn btn-sm btn-outline-primary' : 'btn btn-sm btn-outline-warning'}>
                                                            Read More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        : <div className="col-lg-12"><Loader /></div>
                    }
                </div>
            </div>;
        </>
    );
}

export default Insight;