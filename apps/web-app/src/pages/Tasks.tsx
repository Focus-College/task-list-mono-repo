import React, { Fragment, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Container, Row, Col } from 'react-bootstrap';
import TaskListSummary from '../components/TaskListSummary';
import { useTaskList } from '../data/useTaskList';

function Tasks(){
    
    const { loadRemoteTasks } = useTaskList();

    useEffect(() => {
        loadRemoteTasks();
    }, []);

    return (
        <Container>
        <Row>
            <Col lg={6}>
                <TaskListSummary />
            </Col>
            <Col lg={6}>
                <TaskList />
            </Col>
        </Row>
        </Container>
    );

}

export default Tasks;