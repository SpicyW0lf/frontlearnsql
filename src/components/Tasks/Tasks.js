import React from "react";
import API from '../../service/API';

import Card from '@material-ui/core/Card';
import styles from './styles';
import './modalStyle.css';
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, CardContent, Typography} from "@material-ui/core";
import AddModal from "./addModal";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            addModal: false,
        }
        this.addTask();
    }

    addTask() {
        const data = new FormData();

        data.append('title', "Тестовое задание");
        data.append('task_text', "Просто тест");
        data.append("database_image", "http://learnsql.ru/media/media/sandbox_db_2/media/terraria-png.png");
        data.append("database_description", "<h4>Описание база&nbsp;данных</h4>\r\n\r\n<p>БД Игра &laquo;Террария&raquo;</p>\r\n\r\n<p><strong>player</strong> (игроки/пользователи). Таблица содержит основную информацию о пользователях игры:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор (id_user (PK)),</li>\r\n\t<li>логин (login),</li>\r\n\t<li>дата регистрации (date),</li>\r\n\t<li>пароль (password),</li>\r\n\t<li>статус (status),</li>\r\n\t<li>описание (about),</li>\r\n\t<li>дата бана/блокировки (date_ban).</li>\r\n</ul>\r\n\r\n<p><strong>world </strong>(миры/карты). Таблица содержит сведения об игровых мирах:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор (id_world (PK)),</li>\r\n\t<li>название (name),</li>\r\n\t<li>дата создания (date_create),</li>\r\n\t<li>вместимость игроков/размер (size),</li>\r\n\t<li>тип мира (type_world).</li>\r\n</ul>\r\n\r\n<p><strong>mode</strong> (режимы/моды). Таблица-справочник режимов игры:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор (id_mode (PK)),</li>\r\n\t<li>название (mode).</li>\r\n</ul>\r\n\r\n<p><strong>user_world</strong> (пользовательский мир). Таблица связи между игроками, игровыми мирами и модами:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор активного мира (id_us_world (PK)),</li>\r\n\t<li>номер/идентификатор игрока (id_user (FK)),</li>\r\n\t<li>номер/идентификатор карты/мира(id_world (FK)),</li>\r\n\t<li>номер/идентификатор мода(id_mode (FK)).</li>\r\n</ul>\r\n\r\n<p><strong>npc</strong> (неигровые персонажи/npc). Таблица содержит информацию о неигровых персонажах:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор (id_npc(PK)),</li>\r\n\t<li>описание (about),</li>\r\n\t<li>название/имя (name),</li>\r\n\t<li>тип (type).</li>\r\n</ul>\r\n\r\n<p><strong>boss</strong> (боссы). Таблица отражает сведения о боссах в игре:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор (id_boss (PK)),</li>\r\n\t<li>наносимый урон (damage),</li>\r\n\t<li>уровень (level),</li>\r\n\t<li>магическая способность (magic_trick),</li>\r\n\t<li>имя (name),</li>\r\n\t<li>скорость (speed).</li>\r\n</ul>\r\n\r\n<p><strong>weapon</strong> (оружие). Таблица содержит информацию о номере оружия и об уроне, который может нанести игрок своему противнику, если будет использовать данное оружие:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор (id_weapon (PK)),</li>\r\n\t<li>наносимый урон (damage).</li>\r\n</ul>\r\n\r\n<p><strong>game_item </strong>(игровые предметы). Таблица содержит информацию об игровых предметах, которые могут быть получены игроком в процессе игры:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор предмета(id_item (PK)),</li>\r\n\t<li>описание (about),</li>\r\n\t<li>возможный бонус (bonus),</li>\r\n\t<li>название (name),</li>\r\n\t<li>изображение/иконка (sprite),</li>\r\n\t<li>тип (type),</li>\r\n\t<li>номер/идентификатор как оружия (id_weapon(FK)).</li>\r\n</ul>\r\n\r\n<p><strong>action</strong> (действия/события). Таблица описывает сражения с боссами в игровом мире:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор события/сражения (id_action (PK)),</li>\r\n\t<li>дата проведения (action_date),</li>\r\n\t<li>итог сражения (battle_result),</li>\r\n\t<li>номер сервера/мира (id_us_world (FK))</li>\r\n\t<li>номер/идентификатор босса (id_boss (FK)),</li>\r\n\t<li>номер/идентификатор игрового предмета, который получил игрок после сражения (id_item (FK)).</li>\r\n</ul>\r\n\r\n<p><strong>cooperation </strong>(кооперации). Таблица отражает описание взаимодействия игрока с неигровыми персонажами:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор кооперации (id_cooperation (PK)),</li>\r\n\t<li>номер/идентификатор сервера/мира (id_us_world(FK)),</li>\r\n\t<li>номер/идентификатор неигрового персонажа (id_npc(FK)),</li>\r\n\t<li>номер/идентификатор предмета, который игрок получил (id_item(FK)).</li>\r\n</ul>\r\n\r\n<p><strong>user_item</strong> (пользовательские предметы). Таблица связи между игроком и полученными им в процессе игры предметами:</p>\r\n\r\n<ul>\r\n\t<li>номер/идентификатор пользовательского предмета (id_user_item (PK)),</li>\r\n\t<li>номер/идентификатор игрового предмета (id_item (FK)),</li>\r\n\t<li>дата выдачи (date_item),</li>\r\n\t<li>номер/идентификатор сервера/мира (id_us_world (FK)).</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>");
        data.append("difficulty", 1);
        data.append("sandbox_db", 2);
        data.append("owner", 2);
        data.append("required_words", "select");
        data.append("banned_words", "join");
        data.append("should_check_runtime", false);
        data.append("number_of_attempts", 10);
        data.append("allowed_time_error", 0.0);
        data.append("themes", [
            {
                "theme": {
                    "id": 3,
                    "title": "Простой оператор SELECT",
                    "topic_in_themes": []
                },
                "affilation": 1.0
            }
        ]);


        API.post('/api/tasks/', data)
            .then(res => console.log(res))
            .then(data => console.log(data));
    }

    onAddModalCLick() {
        this.setState()
    }

    componentDidMount() {
        let taski = [];
        for (let i = 1; i < 50; i++) {
            API.get(`/api/tasks/${i}/`)
                .then(res => {
                    taski.push(res.data);
                    this.setState({
                        tasks: taski,
                    })
                })
        }
    }

    render() {
        console.log(this.state);
        const {classes} = this.props;
        const tasks = this.state.tasks;
        return (
            <div>
                <Button onClick={() => this.setState({
                    addModal: true,
                })}
                        style={{backgroundColor: '#1d51a3', color: 'white', align: 'right', marginBottom: '20px'}}
                >Добавить задание</Button>
                <AddModal
                    title={`Добавьте задание`}
                    isOpened={this.state.addModal}
                    onModalClose={() => this.setState({
                        addModal: false,
                    })}
                />
            {tasks.map(task => {
                    return (
                        <Card className={classes.card} key={task.id}>
                            <CardContent>
                                <Typography className={classes.title}>
                                    {task.title}
                                </Typography>
                                <Typography color="textSecondary"
                                            dangerouslySetInnerHTML={{__html: task.task_text}}
                                />
                            </CardContent>
                        </Card>
                    )
                })}

            </div>
        )
    }
}

export default withStyles(styles)(Tasks);