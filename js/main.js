//CLASSES
class Project {
    constructor(title, tags, thumbnailSource, projectSource, viewOnType, viewOnSource) {
        this.title = title;
        this.tags = tags;
        this.thumbnailSource = thumbnailSource;
        this.projectSource = projectSource;
        this.viewOnType = viewOnType;
        this.viewOnSource = viewOnSource;

    }
    getHTML() {
        var tagsToClassNames = "";
        for (i=0; i<this.tags.length; i++) {
            console.log(tagsToClassNames);
            tagsToClassNames += "tag_" + this.tags[i].replace(/\s+/g, "-").toLowerCase();
        }
        return '<div class="projectRow col-4 p-2 ' + tagsToClassNames + '">' +
            '<div class="projectContainer container-fluid">' +
                '<div class="row">' +
                    '<!--project thumbnail-->' +
                    '<div class="col-12 p-0">' +
                        '<a href="' + this.projectSource + '" target="_blank"><img src="' + this.thumbnailSource + '".jpg" class="projectThumbnail"></img></a>' +
                    '</div>' +
                    '<div class="projectDetails col-12 pt-2 pb-2">' +
                        '<p class="m-0">' +
                            '<a href="' + this.projectSource + '" target="_blank"><span class="projectTitle">' + this.title + '</span></a>' +
                            '<br/>' +
                            '<span class="projectCategory">' + this.tags[0] + '</span>' +
                            '<br/>' +
                            '<a href="' + this.viewOnSource + '" target="_blank"><span class="projectViewOn">View on ' + this.viewOnType + '</span></a>' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }
}

//VARIABLES
var projects = [];
var tags = ["Web Development", "Application", "Script", "Highschool", "Assignment", "Personal Project",];
var selectedTags = []


//FUNCTIONS
function getTagHTML(tagName) {
    return '<span class="filterTag">' + tagName + '</span>';
}
function getTagClassName(tagName) {
    return ".tag_" + tagName.replace(/\s+/g, "-").toLowerCase()
}
function displayTags() {
    for (i=0; i<tags.length; i++) {
        $("#filterTags").append(getTagHTML(tags[i]))
    }
}
function displayProjects() {
    for (i=0; i<projects.length; i++) {
        $("#projects").append(projects[i].getHTML());
    }
}

//ON DOCUMENT LOAD
$(function() {

    $.getJSON("test.json", function(file) {
        var newProjects=file.projects;
        for (i=0; i<newProjects.length; i++) {
            projects.push(new Project(newProjects[i].title, newProjects[i].tags, newProjects[i].thumbnailSource, newProjects[i].projectSource, newProjects[i].viewOnType, newProjects[i].viewOnSource));
        }
        displayProjects();
    });

    displayTags();

    $(".filterTag").click(function() {
        target = $(this)
        if (target.hasClass("filterTagSelected")) {
            target.removeClass("filterTagSelected");
            selectedTags = selectedTags.filter(function(tag) {
                return tag != target.html()
            })
        }
        else {
            target.addClass("filterTagSelected");
            selectedTags.push(target.html());
        }

        for (i=0; i<selectedTags.length; i++) {
            $(getTagClassName(selectedTags[i])).css("display", "block");
        }
        console.log(selectedTags);
    });
});
