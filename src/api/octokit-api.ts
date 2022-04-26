import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";

const octokit = new Octokit({
	auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN,
	userAgent: "klamath",
	previews: ["inertia"],
});

export type Projects = Endpoints["GET /users/{username}/projects"]["response"]["data"];
export type Repositories = Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type RepositoryCommits = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
export type ProjectColumns = Endpoints["GET /projects/{project_id}/columns"]["response"]["data"];
export type ProjectColumnCards = Endpoints["GET /projects/columns/{column_id}/cards"]["response"]["data"];

export const getProjects = async (): Promise<Projects> => {
	const response = await octokit.rest.projects.listForUser({
		username: "vftiago",
	});

	return response.data;
};

export const getProjectColumns = async (
	projectId: number,
): Promise<ProjectColumns> => {
	const response = await octokit.rest.projects.listColumns({
		project_id: projectId,
	});

	return response.data;
};

export const getProjectColumnCards = async (
	columnId: number,
): Promise<ProjectColumnCards> => {
	const response = await octokit.rest.projects.listCards({
		column_id: columnId,
	});

	return response.data;
};

export const getRepos = async (): Promise<Repositories> => {
	const response = await octokit.rest.repos.listForUser({
		type: "owner",
		username: "vftiago",
		sort: "updated",
	});

	return response.data;
};

export const getRepositoryCommits = async (
	repositoryName: string,
): Promise<RepositoryCommits> => {
	const response = await octokit.rest.repos.listCommits({
		owner: "vftiago",
		repo: repositoryName,
		per_page: 5,
	});

	return response.data;
};
