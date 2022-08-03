package org.example.model;

import lombok.Data;

import org.jboss.logging.Logger;
@Data
public class ToDoList {
    private String title;
    private String description;
    private String state;

    /**
     * Method to set state of ToDoList, and forcing it to "DONE" or "INCOMPLETE" only
     * @param state State to set to the object
     */
    public void setState(String state){
        Logger logger = Logger.getLogger(ToDoList.class);
        logger.info("Setting state and forcing it to be \"DONE\" or \"INCOMPLETE\" only");
        if (state.equals("DONE")) {
            this.state = "DONE";
        } else {
            this.state = "INCOMPLETE";
        }
    }


    /**
     * Class constructor
     * @param title Title for the object
     * @param description Description for the object
     * @param state State for the object
     */
    public ToDoList(String title, String description, String state) {
        Logger logger = Logger.getLogger(ToDoList.class);
        logger.info("Initializing class with the following attributes");
        logger.info("Title:"+title);
        logger.info("Description:"+description);
        this.title = title;
        this.description = description;
        setState(state);
        logger.info("State:"+this.state);
    }
}
