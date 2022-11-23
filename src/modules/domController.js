import { Project } from "./project"

export class DOMController {
    constructor(allProjects) {
        this.allProjects = allProjects;

        this.newProjectButton = document.querySelector('#new-project-button');
        this.newProjectForm = document.querySelector('#new-project-form');
        this.allProjectsDiv = document.querySelector('#all-projects');

        this.newProjectButton.addEventListener('click', () => {
            this.newProjectForm.classList.toggle('hidden');
        });
        // Event listener for the button with textContent 'Submit'
        this.newProjectForm.querySelector('button').addEventListener('click', (e) => {
            const createNewProject = () => {
                const newProjectTitle = document.querySelector('#new-project-title').value;
                const newProject = new Project({
                    title: newProjectTitle,
                    objectId: this.allProjects.nextObjectId
                });
                return newProject;
            };
            const makeTitleInput = (title, projectID) => {
                const titleInput = document.createElement('input');
                titleInput.value = title;
                titleInput.disabled = true;
                const name = `project-${projectID}-input`;
                titleInput.name = name;
                titleInput.id = name;
                return titleInput;
            };
            const makeTitleLabel = (titleInput) => {
                const titleLabel = document.createElement('label');
                titleLabel.textContent = 'Project Name: ';
                titleLabel.setAttribute('for', titleInput.id);
                return titleLabel;
            };
            const makeSoonestDueDateDiv = () => {
                const soonestDueDateDiv = document.createElement('div');
                soonestDueDateDiv.textContent = 'Soonest Due Date: N/A';
                soonestDueDateDiv.classList.add('soonest-due-date');
                return soonestDueDateDiv;
            };
            const makeEditProjectButton = () => {
                const editProjectButton = document.createElement('button');
                editProjectButton.type = 'button';
                editProjectButton.textContent = 'Edit Project';
                editProjectButton.classList.add('edit-project');
                return editProjectButton;
            };
            const makeDeleteProjectButton = () => {
                const deleteProjectButton = document.createElement('button');
                deleteProjectButton.type = 'button';
                deleteProjectButton.textContent = 'Delete Project';
                deleteProjectButton.classList.add('delete-project');
                return deleteProjectButton;
            };
            const makeToggleTodoListButton = () => {
                const toggleTodoListButton = document.createElement('button');
                toggleTodoListButton.type = 'button';
                toggleTodoListButton.textContent = 'Open/Close Todo List';
                toggleTodoListButton.classList.add('toggle-todo-list');
                return toggleTodoListButton;
            };
            const makeTodoListDiv = () => {
                const todoListDiv = document.createElement('div');
                todoListDiv.classList.add('todo-list');
                todoListDiv.classList.add('hidden');
                return todoListDiv;
            };
            const makeCreateTodoButton = () => {
                const createTodoButton = document.createElement('button');
                createTodoButton.type = 'button';
                createTodoButton.textContent = 'Create Todo';
                createTodoButton.classList.add('create-todo');
                return createTodoButton;
            };
            const makeTodoList = () => {
                const todoListDiv = makeTodoListDiv();
                const createTodoButton = makeCreateTodoButton();
                todoListDiv.appendChild(createTodoButton);
                return todoListDiv;
            };
            const makeProjectForm = (project) => {
                const projectForm = document.createElement('form');
                projectForm.setAttribute('data-object-id', project.objectId);

                const titleInput = makeTitleInput(project.title, project.objectId);
                const titleLabel = makeTitleLabel(titleInput);
                const soonestDueDateDiv = makeSoonestDueDateDiv();
                const editProjectButton = makeEditProjectButton();
                const deleteProjectButton = makeDeleteProjectButton();
                const toggleTodoListButton = makeToggleTodoListButton();
                const todoList = makeTodoList();

                projectForm.appendChild(titleLabel);
                projectForm.appendChild(titleInput);
                projectForm.appendChild(soonestDueDateDiv);
                projectForm.appendChild(editProjectButton);
                projectForm.appendChild(deleteProjectButton);
                projectForm.appendChild(toggleTodoListButton);
                projectForm.appendChild(todoList);

                return projectForm;
            };
            const displayProject = (projectForm, index) => {
                const parent = this.allProjectsDiv
                if (parent.childElementCount === 0) {
                    parent.appendChild(projectForm);
                } else {
                    parent.insertBefore(
                        projectForm,
                        parent.childNodes[index]
                    );
                };
            };
            const reset = () => {
                this.newProjectForm.reset();
                this.newProjectForm.classList.add('hidden');
            };
            const newProject = createNewProject();
            this.allProjects.add(newProject);
            const projectForm = makeProjectForm(newProject);
            displayProject(
                projectForm, 
                this.allProjects.getIndex(newProject.objectId)
            );
            reset();
        });
        // TODO: complete event listener for button.edit-project
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('edit-project')) {
                const enableTitleInput = () => {
                    // TODO: select the below via its ID
                    const titleInput = e.target.parentNode.querySelector('input');
                    titleInput.disabled = false;
                };
                const makeSubmitEditButton = () => {
                    const submitEditButton = document.createElement('button');
                    submitEditButton.type = 'button';
                    submitEditButton.textContent = 'Submit';
                    submitEditButton.classList.add('submit-edit');
                    return submitEditButton;
                };
                const displaySubmitEditButton = () => {
                    const submitEditButton = makeSubmitEditButton();
                    const projectForm = e.target.parentNode;
                    projectForm.appendChild(submitEditButton);
                };
                enableTitleInput();
                displaySubmitEditButton();
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('submit-edit')) {
                // Find project in allProjects.projectList using data-object-id
                // Use value of titleInput and set it as new title of project
                // Disable titleInput
                const getProjectID = () => {
                    const projectForm = e.target.parentNode;
                    const projectID = parseInt(projectForm.getAttribute('data-object-id'));
                    return projectID;
                };
                const getProject = (projectID) => {
                    const index = this.allProjects.getIndex(projectID);

                    const project = this.allProjects.projectList[index];
                    return project;
                };
                const editProject = (project) => {
                    // TODO: select the below via its ID
                    const titleInput = e.target.parentNode.querySelector('input');
                    project.title = titleInput.value;
                    titleInput.disabled = true;
                };
                const projectID = getProjectID();
                const project = getProject(projectID);
                editProject(project);
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('delete-project')) {
                const removeInternally = (projectForm) => {
                    const projectID = parseInt(projectForm.getAttribute('data-object-id'));
                    allProjects.remove(projectID);
                };
                const removeFromDOM = (projectForm) => {
                    projectForm.remove();
                };
                const removeProject = () => {
                    const projectForm = e.target.parentNode
                    removeInternally(projectForm);
                    removeFromDOM(projectForm);
                };
                removeProject();
            };
        });
        this.allProjectsDiv.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('toggle-todo-list')) {
                const todoListDiv = e.target.parentNode.querySelector('.todo-list');
                todoListDiv.classList.toggle('hidden');
            };
        });
    }
}