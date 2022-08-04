package org.example.service;

import org.example.model.ToDoList;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.HashSet;
import java.util.Set;
import org.jboss.logging.Logger;

@Path("/to-do-list")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ToDoListService {
    Logger logger = Logger.getLogger(ToDoListService.class);
    private final Set<ToDoList> toDoLists = new HashSet<>();

    public ToDoListService() {
        logger.info("Service Initialization");
        toDoLists.add(new ToDoList("Test1", "desc test1", "DONE"));
        toDoLists.add(new ToDoList("Test2", "desc test2", "INCOMPLETE"));
        toDoLists.add(new ToDoList("Test3", "desc test3", "DONE"));
        logger.info("Tasks:"+ toDoLists);
    }

    /**
     * Method to list all task in list
     *
     * @return Set of ToDoList with all tasks registered
     */
    @GET
    public Set<ToDoList> list() {
        logger.info("Listing all task in Set of ToDoList");
        logger.info("Tasks returned to the API:"+ toDoLists);
        return toDoLists;
    }

    /**
     * Method to add new task to list
     *
     * @param element Task to be added
     * @return Set of ToDoList with all tasks registered
     */
    @POST
    public Set<ToDoList> add(ToDoList element) {
        logger.info("Adding new task in Set of ToDoList");
        logger.info("Element to be added:"+element.toString());
        toDoLists.add(element);
        logger.info("Tasks returned to the API:"+ toDoLists);
        return toDoLists;
    }

    /**
     * Method to delete a task from the list by its title
     *
     * @param title Title of task to be deleted for being used in FrontEnd trough QueryParam
     * @param element Task to be deleted
     * @return Set of ToDoList with all tasks registered
     */
    @DELETE
    public Set<ToDoList> delete(@QueryParam("title") String title,ToDoList element) {
        logger.info("Deleting task in Set of ToDoList");
        logger.info("Element to be deleted:"+element);
        logger.info("Title to be deleted:"+title);
        if(title != null && !title.isEmpty()){
            toDoLists.removeIf(value -> value.getTitle().contentEquals(title));
        }else if(!element.getTitle().isEmpty()){
            toDoLists.removeIf(value -> value.getTitle().contentEquals(element.getTitle()));
        }
        logger.info("Tasks returned to the API:"+ toDoLists);
        return toDoLists;
    }


    /**
     * Method to update a task from the list by its title
     *
     * @param element Task to be updated
     * @return Set of ToDoList with all tasks registered
     */
    @PUT
    public Set<ToDoList> update(ToDoList element) {
        logger.info("Updating task in Set of ToDoList");
        logger.info("Element with title to be updated:"+element.toString());
        toDoLists.forEach(value -> {
            if (value.getTitle().equals(element.getTitle())) {
                logger.info("Updating task with title:"+ element.getTitle());
                value.setDescription(element.getDescription());
                value.setState(element.getState());
            }
        });
        logger.info("Tasks returned to the API:"+ toDoLists);
        return toDoLists;
    }

    /**
     * Method to update the status of a task by its title
     *
     * @param title Task to be updated
     * @param state New state for the task
     * @return Set of ToDoList with all tasks registered
     */
    @PUT
    @Path("/state")
    public Set<ToDoList> updateStatus(@QueryParam("title") String title,@QueryParam("state") String state) {
        logger.info("Updating status of task in Set of ToDoList");
        logger.info("Element with title to be updated:"+title);
        for (ToDoList value : toDoLists) {
            if (value.getTitle().equals(title)) {
                logger.info("Updating task with title:"+ title);
                logger.info("Updating task state to:"+ state);
                value.setState(state);
                logger.info("Breaking loop after updated the first element found with the same title");
                break;
            }
        }
        logger.info("Tasks returned to the API:"+ toDoLists);
        return toDoLists;
    }

    /**
     * Method to get a task by its title
     *
     * @param element Task with the title to be got with the API
     * @return Set of ToDoList with all tasks with the same title
     */
    @GET
    @Path("/task")
    public Set<ToDoList> getTask(@QueryParam("title") String element) {
        //Buscar y obtener
        logger.info("Getting task from Set of ToDoList");
        logger.info("Element to get by its title:"+element);
        Set<ToDoList> toDoResultsLists = new HashSet<>();
        toDoLists.forEach(value -> {
            if (value.getTitle().equals(element)) {
                logger.info("Adding task to list to return to the user:"+ value);
                toDoResultsLists.add(value);
            }
        });
        logger.info("Tasks returned to the API:"+ toDoResultsLists);
        return toDoResultsLists;
    }
}