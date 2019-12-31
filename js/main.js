//CLASSES
class Project {
    constructor(show, title, tags, thumbnailSource, projectSource, viewOnType, viewOnSource) {
        this.show = show;
        this.title = title;
        this.tags = tags;
        this.thumbnailSource = thumbnailSource;
        this.projectSource = projectSource;
        this.viewOnType = viewOnType;
        this.viewOnSource = viewOnSource;
    }
    getHTML() {
        if (!this.show) {
            return ""
        }
        var tagsToClassNames = "";
        for (i=0; i<this.tags.length; i++) {
            tagsToClassNames += " tag_" + this.tags[i].replace(/\s+/g, "-").toLowerCase();
        }
        return '<div class="projectRow col-xs-12 col-sm-12 col-md-6 col-lg-4 p-2' + tagsToClassNames + '">' +
            '<div class="projectContainer container-fluid">' +
                '<div class="row">' +
                    '<!--project thumbnail-->' +
                    '<a href="' + this.projectSource + '" target="_blank">' +
                        '<div class="col-12 p-0 projectThumbnailContainer">' +
                            '<img src="' + this.thumbnailSource + '".jpg" class="projectThumbnail"></img>' +
                        '</div>' +
                    '</a>' +
                    '<div class="projectDetails col-12 pt-2 pb-2">' +
                        '<div><a href="' + this.projectSource + '" target="_blank" class="link"><span class="projectTitle">' + this.title + '</span></a></div>' +
                        '<div class="pt-1"><span class="projectCategory">' + this.tags[0] + '</span></div>' +
                        '<div><a href="' + this.viewOnSource + '" target="_blank" class="link"><span class="projectViewOn">View on ' + this.viewOnType + '</span></a></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }
}

//VARIABLES
var projects = [];
var tags = ["Development", "Videography"];
var selectedTags = ["Development"]
var showViewOns = false;
var showLeaveAMessage = false;


//FUNCTIONS
function getTagHTML(tagName) {
    return '<span class="filterTag">' + tagName + '</span> ';
}
function getTagClassName(tagName) {
    return ".tag_" + tagName.replace(/\s+/g, "-").toLowerCase()
}
function displayTags() {
    for (i=0; i<tags.length; i++) {
        $("#filterTags").append(getTagHTML(tags[i]));
    }
}
function displayProjects() {
    for (i=0; i<projectsData.length; i++) {
        projects.push(new Project(projectsData[i].show, projectsData[i].title, projectsData[i].tags, projectsData[i].thumbnailSource, projectsData[i].projectSource, projectsData[i].viewOnType, projectsData[i].viewOnSource));
    }
    projects.forEach(function(project) {
        $("#projects").append(project.getHTML());
    });
}
function refreshProjects() {
    //hides all projects
    $("#section_projects").fadeTo(500, 0).hide(0, function() {
        $(".projectRow").hide(0)

        for (i=0; i<selectedTags.length; i++) {
            $(getTagClassName(selectedTags[i])).show(0)
        }
        if (selectedTags.length == 0) {
            $("#tag_all").addClass("filterTagSelected")
            $(".projectRow").show(0);
        }
        $("#section_projects").show(0).fadeTo(500, 1);;
    });
}
function updateShowViewOns() {
    if (window.innerWidth > 991) {
        showViewOns = false;
        $(".projectContainer").find(".projectViewOn").parent().parent().hide(0);
    }
    else {
        showViewOns = true;
        $(".projectContainer").find(".projectViewOn").parent().parent().show(0);
    }
}


//ON DOCUMENT LOAD
$(function() {
    displayProjects();
    displayTags();
    updateShowViewOns();

    //dealing with loading screen
    var loadingAnimation = setInterval(function() {
        if($("#txt_loading").text() == "loading") {
            $("#txt_loading").html("loading.")
        }
        else if($("#txt_loading").text() == "loading.") {
            $("#txt_loading").html("loading..")
        }
        else if($("#txt_loading").text() == "loading..") {
            $("#txt_loading").html("loading...")
        }
        else if($("#txt_loading").text() == "loading...") {
            $("#txt_loading").html("loading")
        }
    }, 500);
    var checkIfIconsLoaded = setInterval(function() {
        if ($("#lastIcon").html() != "") {
            clearInterval(checkIfIconsLoaded);
            setTimeout (function() {
                $("#section_contacts").hide(0);
                $("#section_leaveAMessage").fadeTo(0, 1).hide(0);
                $("#section_loadingScreen").fadeTo(500, 0).hide(function() {
                    $("#section_navigation").fadeTo(500, 1);
                    $("#section_filters").fadeTo(500, 1);
                    $("#section_projects").fadeTo(500, 1);
                });
            }, 1000);
        }
    }, 1000);

    //dealing with navigation links
    $("#navigation_contacts").click(function() {
        if (!$("#section_projects").is(":hidden")) {
            $("#section_filters").fadeTo(500, 0).hide(0);
            $("#section_projects").fadeTo(500, 0).hide(0, function() {
                $("#section_contacts").show().fadeTo(500, 1);
            });
        }
    });
    $("#navigation_projects").click(function() {
        if (!$("#section_contacts").is(":hidden")) {
            $("#section_contacts").fadeTo(500, 0).hide(0, function() {
                $("#section_projects").show(0).fadeTo(500, 1);
                $("#section_filters").show(0).fadeTo(500, 1);
            });
        }
    });

    //deals when tags are clicked
    $(".filterTag").click(function() {
        var target = $(this)

        //checks if "all" tag clicked
        if (target.attr("id") == "tag_all") {
            $(".filterTagSelected").removeClass("filterTagSelected");
            selectedTags = [];
        }

        //updates tag visuals when clicked
        if (target.hasClass("filterTagSelected")) {
            target.removeClass("filterTagSelected");
            selectedTags = selectedTags.filter(function(tag) {
                return tag != target.html()
            })
        }
        else {
            target.addClass("filterTagSelected");
            $("#tag_all").removeClass("filterTagSelected")
            if (target.html() != "All") {
                selectedTags.push(target.html());
            }
        }

        refreshProjects();
    });

    //animation for showing and hiding "view on" information
    $(".projectContainer").mouseenter(function() {
        if (!showViewOns) {
            $(this).find(".projectViewOn").parent().parent().slideDown(500);
        }
    });
    $(".projectContainer").mouseleave(function() {
        if (!showViewOns) {
            $(this).find(".projectViewOn").parent().parent().slideUp(500);
        }
    });

    //dealing with leave a message section
    $("#frm_leaveAMessage").attr("action", "https://formspree.io/albondad@gmail.com")
    $("#btn_submitMessage").slideUp(0);
    $(".link_email").click(function() {
        if (!showLeaveAMessage) {
            $("#section_leaveAMessage").slideDown(500);
            showLeaveAMessage = true;
        }
        else if (showLeaveAMessage) {
            $("#section_leaveAMessage").slideUp(500);
            showLeaveAMessage = false;
        }
    });
    $("#btn_submitMessage, #navigation_projects").click(function() {
        if (showLeaveAMessage) {
            $("#section_leaveAMessage").slideUp(500);
            showLeaveAMessage = false;
        }
    });
    $("#inp_email, #inp_subject, #txtArea_message").focusout(function() {
        if ($("#inp_email").val() == "" || $("#inp_subject").val() == "" || $("#txtArea_message").val() == "") {
            $("#btn_submitMessage").slideUp(500);
        }
        else if (!$("#inp_email").val().includes("@") || !$("#inp_email").val().includes(".")) {
            $("#txt_formError").fadeTo(0, 0).html("please enter a proper email").fadeTo(500, 1);
            $("#btn_submitMessage").slideUp(500);
        }
        else {
            $("#txt_formError").fadeTo(500, 0).html("");
            $("#btn_submitMessage").slideDown(500).fadeTo(500, 1);
        }
    });
});


//ON WINDOW RESIZED LOAD
$(window).resize(function() {
    updateShowViewOns();
});
