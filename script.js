const firstComment = document.querySelector('.main-container');

firstComment.appendChild(createComment('' , ''));

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

function createComment(nameInput , textinput){

    const name = createElement('input' , { className : 'name' , value: nameInput , placeholder: 'Your Name' , disabled: 'disabled' });

    const textbody = createElement('textArea' , {className : 'textBody', placeholder: 'Comment' , cols: '30' , rows: '6' , value: textinput , disabled: 'disabled'});

    const replyButton = createElement('button' , { className: 'reply' , textContent: 'Reply'});

    const deleteBtn = createElement('button' , {className: 'delete' , textContent: 'Delete'});
    
    const editBtn = createElement('button' , {className: 'edit' , textContent: 'Edit'});

    const buttonHolder = createElement('div' , {className: 'commentButtonsHolder'} , replyButton ,editBtn, deleteBtn);

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

        const subCommentNeighbour = element.parentElement.parentElement.nextElementSibling;

        subCommentNeighbour.appendChild(createCommentInput());

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
        editEnabler[0].disabled = '';
        editEnabler[1].disabled = '';
        check = false;
        return;
    }

});

