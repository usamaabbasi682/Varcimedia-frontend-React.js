import { editProject } from "features/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import ProjectFiles from "components/ProjectFiles";
import useCheckLogin from "hooks/useCheckLogin";

const Files = () => {
    useCheckLogin();
    const dispatch = useDispatch();
    const project = useSelector((state) => state.projectStore);
    const { id } = useParams();

    useEffect(() => {
        dispatch(editProject(id));
    },[project?.projects?.data?.files]);
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <ProjectFiles isLoading={project?.isLoading} files={project?.projects && project?.projects?.data?.files} />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Files;