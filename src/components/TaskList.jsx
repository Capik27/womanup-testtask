import React, { useContext } from "react";
import { query, collection, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FireCtx } from "../index.js";
import { Task } from "./Task.jsx";

export const TaskList = () => {
	const { firestore } = useContext(FireCtx);
	const taskCollection = collection(firestore, "tasks");
	const queryTask = query(taskCollection, orderBy("date"));
	const [tasks, loading, error] = query(
		useCollectionData(queryTask, orderBy("date"))
	);

	const taskList = tasks
		? tasks.map((task, index) => (
				<Task key={index} {...task} isMother={false} />
		  ))
		: [];

	if (taskList.length === 0) return;

	return <div className="tasklist">{taskList}</div>;
};
