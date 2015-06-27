- fancy roles thing
- pub / sub in each collection js
- auto menu

- Changing home page styling
- Changing home page background image
- Adding photo integration
- Adding strip integration
- Where to publish subscribe
- How to add FAQs, contact us, ect

- List of every library we use

- Common 'recipies'

- General tips
    - don't use <button> use <a>
    - picking a bootswatch theme

- collections
    - code
        - schema -> what are the accepted values
        - insert, update, remove -> security -> controls who can do these things
        - find, findOne -> publish and subscribe -> template helpers -> who can see what
    - views
        - find -> list of items
        - findOne -> viewing 1 item
        - insert -> show create form
        - update -> show edit form
        - remove -> show delete button

- collections
    - insert
        - views
            - template: insert form
            - page: page for inserting item
        - security rule
    - update
           - views
               - template: update form
               - page: dedicated page for updating item
           - security rule
    - remove
           - views
               - template: insert form
               - page: page for inserting item
           - security rule
    - find
            - views
                - template: findPosts
                - page: shell for rendering findPosts template
    - findOne

- url for viewing specific template
- doing things across an entire collection

- useful hooks
    - collection hooks
        - individual document hooks
    - onStartup
    - onRendered
    -