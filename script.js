const firstComment = document.querySelector('.main-container');

let firstCommentChecker = true;

firstComment.appendChild(createComment('' , '' , true ));

let editToggler = false;

function createElement(elementType = 'div', properties , ...children){
    
    const element = document.createElement(elementType);
    
    for(let key in properties){
        element[key] = properties[key];
    }

    children.forEach((child) =>{
        element.appendChild(child);
    });

    return element;

}

function createComment(nameInput , textinput , firstCommentChecker){

    let name = createElement('input' , { className : 'name' , value: nameInput , placeholder: 'Your Name' , disabled: 'disabled' });
    let textbody = createElement('textArea' , {className : 'textBody', placeholder: 'Comment' , cols: '30' , rows: '6' , value: textinput , disabled: 'disabled'});
    let deleteBtn = createElement('button' , {className: 'delete' , textContent: 'Delete'});
    let replyButton = createElement('button' , { className: 'reply' , textContent: 'Reply'});
    let editBtn = createElement('button' , {className: 'edit' , textContent: 'Edit'});
    let buttonHolder = createElement('div' , {className: 'commentButtonsHolder'} , replyButton ,editBtn, deleteBtn);

    if(firstCommentChecker){
        name = createElement('input' , { className : 'name' , value: nameInput , placeholder: 'Your Name'});
        textbody = createElement('textArea' , {className : 'textBody', placeholder: 'Comment' , cols: '30' , rows: '6' , value: textinput});
        replyButton = createElement('button' , { className: 'reply' , textContent: 'Reply'});
        // editBtn = createElement('button' , {className: 'edit' , textContent: 'Edit'});
        buttonHolder = createElement('div' , {className: 'commentButtonsHolder'} , replyButton);
        firstCommentChecker = false;
    }

    const mainComment = createElement('div' , {className: 'mainComment'} , name , textbody , buttonHolder);

    const subComment = createElement('div' , { className : 'sub-comment'});

    const commentContainer = createElement('div' , { className: 'commentContainer'} , mainComment , subComment);

    return commentContainer;
}


function createCommentInput(){

    const nameField = createElement('input' , {className : 'name' , placeholder: 'Your Name'});

    const textInput = createElement('input' , {className: 'textBody' , placeholder : 'Comment' , cols: '30' , rows: '6'});

    const postBtn = createElement('button' , {className: 'post' , textContent: 'Post'});
    
    const cancelBtn = createElement('button' , {className: 'cancel' , textContent: 'Cancel'});


    const buttonHolder = createElement('div' , {className: 'inputCommentButtons'} , postBtn , cancelBtn) ;

    const finalComment = createElement('div' , {className: 'inputComment'} , nameField , textInput , buttonHolder);

    return finalComment;
}

let check = false;

firstComment.addEventListener('click' , (e)=>{

    // console.log(e);

    const element = e.target;

    // console.log(createCommentInput());

    if( element.className === 'reply' && !check){
        const firstInputName = element.parentElement.parentElement.children[0].value;
        const firstInputText = element.parentElement.parentElement.children[1].value;
        const subCommentNeighbour = element.parentElement.parentElement.nextElementSibling;
        
        console.log(firstInputName);
        if( !firstInputName || !firstInputText){
            return;
        }
        if( editToggler === false ){
            subCommentNeighbour.appendChild(createCommentInput());
        }
        else{
            alert('First Save Your Comment');
        }

        check = true;
    }

    if( element.className === 'post'){

        const nameValue = element.parentElement.parentElement.children[0].value;

        const textvalue = element.parentElement.parentElement.children[1].value;

        if( !nameValue || !textvalue){
            return;
        }
        const nestedComment = element.parentElement.parentElement.parentElement;

        nestedComment.appendChild(createComment(nameValue , textvalue));

        element.parentElement.parentElement.remove();

        check = false;
        return;
    }

    if( element.className === 'cancel'){
        check = false;
        element.parentElement.parentElement.remove();
        return;
    }
    if( element.className === 'delete'){

        const commentToBeDeleted = element.parentElement.parentElement.parentElement;

        if(confirm('This Comment Will Be Deleted')){
            commentToBeDeleted.remove()
        };
        check = false;
        return;
    }

    if( element.className === 'edit'){
        const editEnabler = element.parentElement.parentElement.children;

        if( editToggler === false){
            editEnabler[0].disabled = '';
            editEnabler[1].disabled = '';
            element.textContent = 'Save';
            editToggler = true;
        }
        else{
            editEnabler[0].disabled = 'disabled';
            editEnabler[1].disabled = 'disabled';
            element.textContent = 'Edit';
            editToggler = false;
        }
        check = false;
        return;
    }
});



