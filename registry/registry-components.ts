import { Registry } from "./schema";

export const ui: Registry = [
  // AUTHCARD
  {
    name: "authcard-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-01/authcard.tsx",
    ],
  },
  {
    name: "authcard-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-02/authcard.tsx",
    ],
  },
  {
    name: "authcard-03",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-03/authcard.tsx",
    ],
  },
  {
    name: "authcard-04",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "checkbox",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-04/authcard.tsx",
    ],
  },
  {
    name: "authcard-05",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "checkbox",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-05/authcard.tsx",
    ],
  },
  {
    name: "authcard-06",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-06/authcard.tsx",
    ],
  },
  {
    name: "authcard-07",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-07/authcard.tsx",
    ],
  },
  {
    name: "authcard-08",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form", "react-icons"],
    files: [
      "block/AuthCard/authcard-08/authcard.tsx",
    ],
  },
  // ACCORDION
  {
    name: "accordion-01",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Accordion/accordion-01/accordion.tsx",
    ],
  },
  {
    name: "accordion-02",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Accordion/accordion-02/accordion.tsx",
    ],
  },
  {
    name: "accordion-03",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    dependencies: ["lucide-react", "framer-motion"],
    files: [
      "block/Accordion/accordion-03/accordion.tsx",
    ],
  },
  {
    name: "accordion-04",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    files: [
      "block/Accordion/accordion-04/accordion.tsx",
    ],
  },
  {
    name: "accordion-05",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    files: [
      "block/Accordion/accordion-05/accordion.tsx",
    ],
  },
  {
    name: "accordion-06",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Accordion/accordion-06/accordion.tsx",
    ]
  },
  {
    name: "accordion-07",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Accordion/accordion-07/accordion.tsx",
    ]
  },
  {
    name: "accordion-08",
    type: "registry:block",
    registryDependencies: [
      "accordion",
    ],
    dependencies: ["lucide-react", "react-icons/bs"],
    files: [
      "block/Accordion/accordion-08/accordion.tsx",
    ]
  },

  // DATEPICKER
  {
    name: "datepicker-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "checkbox",
      "input",
      "label",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Datepicker/datepicker-01/date-picker.tsx",
      "block/Datepicker/datepicker-01/hooks/use-media-query.ts",
    ],
  },
  {
    name: "datepicker-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dialog",
    ],
    dependencies: ["lucide-react", "date-fns"],
    files: [
      "block/Datepicker/dtepicker-02/date-picker.tsx",
    ],
  },
  {
    name: "datepicker-03",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dialog",
    ],
    dependencies: ["lucide-react", "date-fns"],
    files: [
      "block/Datepicker/datepicker-03/date-picker.tsx",
    ],
  },
  // CoMMAND MENU
  {
    name: "commandmenu-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "avatar",
      "command"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/CommandMenu/commandmenu-01/command-menu.tsx",
      "block/CommandMenu/commandmenu-01/dialog.tsx",
      "block/CommandMenu/commandmenu-01/hooks/use-mobile.tsx",
    ],
  },
  {
    name: "commandmenu-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "avatar",
      "command"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/CommandMenu/commandmenu-02/command-menu.tsx",
    ],
  },
  // BUTTON
  {
    name: "button-01",
    type: "registry:block",
    files: [
      "block/Button/button-01/button.tsx",
      "block/Button/button-01/Button.css",
    ],
  },
  {
    name: "button-02",
    type: "registry:block",
    files: [
      "block/Button/button-02/button.tsx",
      "block/Button/button-02/Button.css",
    ],
  },
  {
    name: "button-03",
    type: "registry:block",
    files: [
      "block/Button/button-03/button.tsx",
      "block/Button/button-03/Button.css",
    ],
  },
  {
    name: "button-04",
    type: "registry:block",
    files: [
      "block/Button/button-04/button.tsx",
      "block/Button/button-04/Button.css",
    ]
  },
  {
    name: "button-05",
    type: "registry:block",
    files: [
      "block/Button/button-05/button.tsx",
      "block/Button/button-05/Button.css",
    ]
  },
  {
    name: "button-06",
    type: "registry:block",
    files: [
      "block/Button/button-06/button.tsx",
      "block/Button/button-06/Button.css",
    ]
  },
  // DRaWER
  {
    name: "drawer-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "checkbox",
      "input",
      "radio-group",
      "label",
      "select",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Drawer/drawer-01/drawer.tsx",
      "block/Drawer/drawer-01/demo.tsx",
    ],
  },
  {
    name: "drawer-02",
    type: "registry:block",
    dependencies: ["lucide-react",],
    files: [
      "block/Drawer/drawer-02/drawer.tsx",
      "block/Drawer/drawer-02/demo.tsx",
      "block/Drawer/lib/utils.ts"
    ],
  },
  {
    name: "drawer-03",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Drawer/drawer-03/drawer.tsx",
      "block/Drawer/drawer-03/demo.tsx",
    ],
  },
  {
    name: "drawer-04",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "textarea",
      "select",
    ],
    dependencies: ["lucide-react", "@hookform/resolvers/zod", "zod", "react-hook-form"],
    files: [
      "block/Drawer/drawer-04/drawer.tsx",
      "block/Drawer/drawer-04/demo.tsx",
    ],
  },

  // DIALOG
  {
    name: "dailog-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog"
    ],
    files: [
      "block/Dialog/dialog-01/dialog.tsx",
      "block/Dialog/dialog-01/demo.tsx",
    ],
  },
  {
    name: "dailog-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
      "badge",
      "dropdown-menu",
      "avatar",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-02/dialog.tsx",
      "block/Dialog/dialog-02/demo.tsx",
    ],
  },
  {
    name: "dailog-03",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
      "badge",
      "select",
      "avatar",
      "separator",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-03/dialog.tsx",
      "block/Dialog/dialog-03/demo.tsx",
      "block/Dialog/lib/utils.ts",
      "block/Dialog/hooks/use-toast.ts",
    ],
  },
  {
    name: "dailog-04",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-04/dialog.tsx",
      "block/Dialog/dialog-04/demo.tsx",
      "block/Dialog/hooks/use-toast.ts",
    ],
  },
  {
    name: "dailog-05",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "dropdown-menu",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-05/dialog.tsx",
      "block/Dialog/dialog-05/demo.tsx",
    ],
  },
  {
    name: "dailog-06",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-06/dialog.tsx",
      "block/Dialog/dialog-06/demo.tsx",
      "block/Dialog/lib/utils.ts",
    ],
  },
  {
    name: "dailog-07",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
      "badge",
      "select",
      "switch",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-07/dialog.tsx",
      "block/Dialog/dialog-07/demo.tsx",
    ],
  },
  {
    name: "dailog-08",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
      "textarea",
      "select",
      "popover",
      "calendar",
    ],
    dependencies: ["lucide-react", "date-fns"],
    files: [
      "block/Dialog/dialog-08/dialog.tsx",
      "block/Dialog/dialog-08/demo.tsx",
      "block/Dialog/lib/utils.ts",
    ],
  },
  {
    name: "dailog-09",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dailog",
      "input",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dialog/dialog-09/dialog.tsx",
      "block/Dialog/dialog-09/demo.tsx",
      "block/Dialog/lib/utils.ts",
    ],
  },


  // File Upload

  {
    name: "fileupload-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "table"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/FileUpload/fileupload-01/demo.tsx",
      "block/FileUpload/fileupload-01/fileupload.tsx",
    ],
  },
  {
    name: "fileupload-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "table"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/FileUpload/fileupload-02/demo.tsx",
      "block/FileUpload/fileupload-02/fileupload.tsx",
      "block/FileUpload/fileupload-02/use-file-upload.tsx",
    ]
  },
  {
    name: "fileupload-03",
    type: "registry:block",
    registryDependencies: [
      "button",
      "progress",
    ],
    dependencies: ["lucide-react", "react-dropzone"],
    files: [
      "block/FileUpload/fileupload-03/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-04",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/FileUpload/fileupload-04/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-05",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
      "progress",
      "badge"
    ],
    dependencies: ["lucide-react", "react-dropzone", "framer-motion"],
    files: [
      "block/FileUpload/fileupload-05/demo.tsx",
      "block/FileUpload/fileupload-05/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-06",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/FileUpload/fileupload-06/demo.tsx",
      "block/FileUpload/fileupload-06/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-07",
    type: "registry:block",
    registryDependencies: [
      "button",
      "progress",
      "alert-dialog"
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/FileUpload/fileupload-07/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-08",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/FileUpload/fileupload-08/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-09",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
      "progress",
      "tabs",
      "input",
      "label"
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/FileUpload/fileupload-09/fileupload.tsx",
    ]
  },
  {
    name: "fileupload-10",
    type: "registry:block",
    registryDependencies: [],
    dependencies: ["lucide-react", "react-dropzone", "framer-motion"],
    files: [
      "block/FileUpload/fileupload-10/fileupload.tsx",
    ]
  },

  //Dropdown
  {
    name: "dropdown-01",
    type: "registry:block",
    registryDependencies: [
      "popover",
      "command",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-01/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-02",
    type: "registry:block",
    registryDependencies: [
      "dropdown-menu",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-02/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-03",
    type: "registry:block",
    registryDependencies: [
      "dropdown-menu",
      "avatar",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-03/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-04",
    type: "registry:block",
    registryDependencies: [
      "dropdown-menu",
      "button",
      "input",
      "scroll-area"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-04/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-05",
    type: "registry:block",
    registryDependencies: [
      "dropdown-menu",
      "tabs",
      "button",
      "popover",
      "scroll-area",
      "badge"
    ],
    dependencies: ["lucide-react", "date-fns"],
    files: [
      "block/Dropdown/dropdown-05/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-06",
    type: "registry:block",
    registryDependencies: [
      "command",
      "popover",
    ],
    dependencies: ["lucide-react"],
    files: [
      "block/Dropdown/dropdown-06/demo.tsx",
      "block/Dropdown/dropdown-06/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-07",
    type: "registry:block",
    registryDependencies: [
      "button",
      "popover",
      "tabs"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-07/demo.tsx",
      "block/Dropdown/dropdown-07/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-08",
    type: "registry:block",
    registryDependencies: [
      "avatar",
      "button",
      "dropdown-menu",
      "badge"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-08/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-09",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dropdown-menu",
      "checkbox"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-09/dropdown.tsx",
    ]
  },
  {
    name: "dropdown-10",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dropdown-menu",
      "avatar",
      "badge",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Dropdown/dropdown-10/dropdown.tsx",
    ]
  },

  // NOTIFICATION
  {
    name: "notification-01",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
      "popover",
      "dropdown-menu",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-01/notification.tsx",
      "block/Notification/notification-01/demo.tsx",
    ],
  },
  {
    name: "notification-02",
    type: "registry:block",
    registryDependencies: [
      "button",
      "card",
      "popover",
      "dropdown-menu",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-02/notification.tsx",
      "block/Notification/notification-02/demo.tsx",
    ],
  },
  {
    name: "notification-03",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dropdown-menu",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-03/notification.tsx",
      "block/Notification/notification-03/demo.tsx",
    ],
  },
  {
    name: "notification-04",
    type: "registry:block",
    registryDependencies: [
      "button",
      "popover",
      "scroll-area",
      "separator"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-04/notification.tsx",
    ]
  },
  {
    name: "notification-05",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dropdown-menu",
      "scroll-area",
      "tabs",
      "avatar",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-05/notification.tsx",
    ]
  },
  {
    name: "notification-06",
    type: "registry:block",
    registryDependencies: [
      "button",
      "dialog",
      "scroll-area",
      "tooltip",
      "badge",
      "separator"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-06/notification.tsx",
    ]
  },
  {
    name: "notification-07",
    type: "registry:block",
    registryDependencies: [
      "button",
      "sheet",
      "tabs",
      "badge",
    ],
    dependencies: ["lucide-react", "framer-motion"],
    files: [
      "block/Notification/notification-07/notification.tsx",
    ]
  },
  {
    name: "notification-08",
    type: "registry:block",
    registryDependencies: [
      "button",
      "tabs",
      "scroll-area",
      "avatar",
      "badge",
      "separator",
      "hover-card"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-08/notification.tsx",
    ]
  },
  {
    name: "notification-09",
    type: "registry:block",
    registryDependencies: [
      "button",
      "popover",
      "scroll-area",
      "separator",
      "badge",
      "command"
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Notification/notification-09/notification.tsx",
    ]
  },
  {
    name: "notification-10",
    type: "registry:block",
    registryDependencies: [
      "button",
      "input",
      "scroll-area",
      "sheet",
    ],
    dependencies: ["lucide-react", "framer-motion"],
    files: [
      "block/Notification/notification-10/notification.tsx",
    ]
  },

  // Radio Button
  {
    name: "radiobutton-01",
    type: "registry:block",
    registryDependencies: [
      "radio-group",
      "button",
      "separator",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/RadioButton/radiobutton-01/radiobutton.tsx",
    ]
  },
  {
    name: "radiobutton-02",
    type: "registry:block",
    registryDependencies: [
      "radio-group",
      "button",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/RadioButton/radiobutton-02/radiobutton.tsx",
    ]
  },
  {
    name: "radiobutton-03",
    type: "registry:block",
    registryDependencies: [
      "radio-group",
      "avatar",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/RadioButton/radiobutton-03/radiobutton.tsx",
    ]
  },
  {
    name: "radiobutton-04",
    type: "registry:block",
    registryDependencies: [
      "radio-group",
      "separator",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/RadioButton/radiobutton-04/radiobutton.tsx",
    ]
  },
  {
    name: "radiobutton-05",
    type: "registry:block",
    registryDependencies: [
      "radio-group",
      "button",
      "separator",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/RadioButton/radiobutton-05/radiobutton.tsx",
    ]
  },
  {
    name: "radiobutton-06",
    type: "registry:block",
    registryDependencies: [
      "radio-group",
      "button",
      "separator",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/RadioButton/radiobutton-06/radiobutton.tsx",
    ]
  },



  // SWITCH
  {
    name: "switch-01",
    type: "registry:block",
    registryDependencies: [
      "switch",
      "button",
      "card",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Switch/switch-01/switch.tsx",
    ],
  },
  {
    name: "switch-02",
    type: "registry:block",
    registryDependencies: [
      "switch",
      "button",
      "card",
    ],
    dependencies: ["lucide-react",],
    files: [
      "block/Switch/switch-02/switch.tsx",
    ],
  },
  {
    name: "switch-03",
    type: "registry:block",
    registryDependencies: [
      "switch",
      "avatar",
    ],
    files: [
      "block/Switch/switch-03/switch.tsx",
    ],
  },
];