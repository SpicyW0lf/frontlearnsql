import React from "react";
import {useState, useEffect} from "react";
import {Redirect} from "react-router";
import API, {config} from '../../service/API';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import styles from './styles';
import './modalStyle.css';
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, CardContent, lighten, makeStyles, Typography} from "@material-ui/core";
import AddModal from "./addModal";
import UpdModal from "./updModal";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


import UserService from "../../service/user-service";
import {appRouter} from "../../service/router-service";
import {Delete} from "@material-ui/icons";

const userService = UserService.factory();
let filtired = null;
let taskes = [];
let databases = {0: "Все",};
const difficulty = {
    0: "Все",
    1: "Очень просто",
    2: "Легко",
    3: "Средний уровень",
    4: "Трудно",
    5: "Очень сложно",
}
const headCells = [
    {id: 'id', numeric: false, disablePadding: false, label: 'Id'},
    {id: 'title', numeric: true, disablePadding: true, label: 'Title'},
    {id: 'sandbox_db', numeric: true, disablePadding: false, label: 'SandoxDB'},
    {id: 'difficulty', numeric: true, disablePadding: false, label: 'Difficulty'},
]


const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stableizedThis = array.map((el, index) => [el, index]);
    stableizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    return stableizedThis.map((el) => el[0]);
}

const onSubmitUpdModal = (task) => {
    const formData = new FormData();
    formData.append('id', task.taskId);
    formData.append('title', task.taskName);
    formData.append('task_text', task.taskText);
    formData.append('reference_solution', task.taskSolution);
    formData.append('sandbox_db', task.taskBd);
    formData.append('owner', 1);

    API.put(`/api/tasks_for_petrov/${task.taskId}/`, formData, config)
        .then(res => {
            alert('Задание успешно изменено!');
            //Здесь вызывали маунт
        })
        .catch(error => alert('Не удалось изменить задание!'));
}

const getTasks = () => {
    API.get(`/api/tasks_for_petrov/`, config)
        .then(res => {
            taskes = res.data.results;
        });
}

const onSearchHandler = (e) => {
    getTasks();
    const text = e.target.value.toLowerCase() || '';
    const tasks = taskes;

    filtired = tasks.filter((el, index) => {
        const tit = el.title.toLowerCase();

        return tit.includes(text);
    })
}


function AllTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.tHead}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all tasks' }}
                        />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const AllToolBar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, onDeleteClick } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Tasks
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={onDeleteClick} />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    allTable: {
        display: "grid",
        gridTemplateColumns: "5fr 1fr",
        gridGap: "0 30px"
    },
    selectedFilter: {
        textDecoration: 'none',
        color: 'black',
        marginTop: '10px',
        backgroundColor: 'blue',
    },
    aFilters: {
        textDecoration: 'none',
        color: 'black',
        marginTop: '10px',
    },
    card: {
        gridColumn: '2/3',
        gridRow: '1/3',
        height: 'fit-content',
        padding: '10px',
    },
    tHead: {
        gridColumn: '1/2',
        gridRow: '1/2',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        gridColumn: '1/2',
        gridRow: '2/3',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const getDatabases = () => {
    let dbs;

    API.get(`/api/databases/`, config)
        .then(res => {
            dbs = res.data.results;
            dbs.forEach((el) => {
                databases[`${el.id}`] = el.title;
            })
        });
}

export default function Tasks(props) {
    const classes = useStyles();

    const [task, setTask] = useState({});
    const [tasks, setTasks] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [updModal, setUpdModal] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('difficulty');
    const [selected, setSelected] = useState([]);
    const [updated, setUpdated] = useState(false);

    const taski = filtired || tasks;
    getDatabases();
    let filtDat = [];
    let filtDif = [];
    for (let key in databases) {
        filtDat.push([databases[key], key]);
    }
    for (let key in difficulty) {
        filtDif.push([difficulty[key], key]);
    }

    useEffect(() => {
        API.get(`/api/tasks_for_petrov/`, config)
            .then(res => {
                taskes = res.data.results;
                setTasks(taskes);
                //if (tasks === []) setTasks(taskes);
            });
    }, [updated]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleDeleteClick = () => {
        let undeleted = [];

        const fetchEnd = () => {
            let newUndeleted = undeleted.filter(n => n);
            console.log(newUndeleted);
            if (newUndeleted.length === selected.length) {
                alert("Не удалось удалить задания");
            } else if (newUndeleted.length === 0) {
                alert("Все задания успешно удалены");
                setUpdated(!updated);
            } else {
                alert(`Не удалось удалить задания с id: ${newUndeleted.join(',')}`);
                setUpdated(!updated);
            }
        }


        selected.forEach((el, index) => {
                API.delete(`/api/tasks_for_petrov/${el}/`, config)
                    .then(res => {
                        undeleted.push(null);
                        if (undeleted.length === selected.length) {
                            fetchEnd();
                        }
                    })
                    .catch((error) => {
                        undeleted.push(el);
                        if (undeleted.length === selected.length) {
                            fetchEnd();
                        }
                });
        });
    };

    const onSubmitAddModal = (task) => {
        const formData = new FormData();
        formData.append('title', task.taskName);
        formData.append('reference_solution', task.taskSolution);
        formData.append('task_text', task.taskText);
        formData.append('sandbox_db', task.taskBd);
        formData.append('owner', 1);
        API.post('/api/tasks_for_petrov/', formData, config)
            .then(res => {
                alert('Задание успешно добавлено!');
            })
            .catch(error => alert('Не удалось добавить задание!'));
        setUpdated(!updated);
    };

    const handleFilterClick = (event, fil) => {
        getTasks();
        event.preventDefault();
        const dbId = event.target.title;
        const tasks = taskes;
        if (dbId == 0) {
            console.log(dbId);
            filtired = tasks.slice();
            setUpdated(!updated);
            return;
        }
        filtired = tasks.filter((el, index) => {
            let tit;
            if (fil === 'dat') {
                tit = el.sandbox_db;
            } else {
                tit = el.difficulty;
            }
            return tit == dbId;
        })
        setUpdated(!updated);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = taski.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    if (!userService.isAuth) return <Redirect to={appRouter.getSignInRoute()} />;

    return (
        <div className={classes.root}>
            <Button onClick={() => {setAddModal(true)}}
                    style={{backgroundColor: '#1d51a3', color: 'white', marginBottom: '20px'}}
            >
                Добавить задание
            </Button>
            <input
                type="text"
                id="header-search"
                placeholder="Поиск задания"
                name="s"
                onChange={(e) => {
                    onSearchHandler(e);
                    setTasks(filtired);
                }}
            />
            <AddModal
                title={`Добавьте задание`}
                isOpened={addModal}
                onModalClose={() => {setAddModal(false)}}
                onSubmitModal={onSubmitAddModal}
                Difficulty={filtDif}
                Databases={filtDat}
            />
            <UpdModal
                title={'Измените задание'}
                prevTask={task}
                isOpened={updModal}
                onModalClose={() => {setUpdModal(false)}}
                onSubmitModal={onSubmitUpdModal}
            />
            <div className={classes.allTable}>
            <Paper className={classes.paper}>
                <AllToolBar numSelected={selected.length} onDeleteClick={handleDeleteClick}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <AllTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={taski.length}
                        />
                        <TableBody>
                            {stableSort(taski, getComparator(order, orderBy))
                                .map((task, index) => {
                                    const isItemSelected = isSelected(task.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, task.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={task.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell  component="th" id={labelId} scope="row" padding="none">
                                                {task.id}
                                            </TableCell>
                                            <TableCell align="right">{task.title}</TableCell>
                                            <TableCell align="right">{databases[task.sandbox_db]}</TableCell>
                                            <TableCell align="right">{difficulty[task.difficulty]}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
                <Card className={classes.card}>
                    <h3>Фильтры</h3>
                    <CardContent>
                        <h4>sandbox_db</h4>
                        <ul style={{listStyle: 'none', padding: '0',}}>
                        {filtDat.map((el, index) => {
                            return (
                                <li>
                                    <a
                                       href={el[0]}
                                       title={el[1]}
                                       className={ classes.aFilters}
                                       onClick={(e) => {
                                           handleFilterClick(e, 'dat');
                                           setTasks(filtired);
                                       }}
                                    >
                                    {el[0]}
                                    </a>
                                </li>
                            )
                        })}
                        </ul>
                        <h4>difficulty</h4>
                        <ul style={{listStyle: 'none', padding: '0',}}>
                            {filtDif.map((el, index) => {
                                return (
                                    <li>
                                        <a
                                            href={el[0]}
                                            title={el[1]}
                                            className={classes.aFilters}
                                            onClick={(e) => {
                                                handleFilterClick(e, 'dif');
                                                setTasks(filtired);
                                            }}
                                        >
                                            {el[0]}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}