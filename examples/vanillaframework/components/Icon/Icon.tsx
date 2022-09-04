import { Component, JSXFactory, Props } from "../../../../src";

export enum StandardIcons {
    PLUS = "plus",
    MINUS = "minus",
    EXPAND = "expand",
    COLLAPSE = "collapse",
    SPINNER = "spinner",
    DRAG = "drag",
    CLOSE = "close",
    HELP = "help",
    INFORMATION = "information",
    DELETE = "delete",
    EXTERNAL_LINK = "external-link",
    CHEVRON_DOWN = "chevron-down",
    CHEVRON_UP = "chevron-up",
    MENU = "menu",
    CODE = "code",
    COPY = "copy",
    SEARCH = "search",
    SHARE = "share",
    USER = "user",
    ANCHOR = "anchor",
    SHOW = "show",
    HIDE = "hide"
}

export enum AdditionnalIcons
{
    APPLICATIONS = "applications",
    CONTROLLERS = "controllers",
    FULLSCREEN = "fullscreen",
    MODELS = "models",
    MACHINES = "machines",
    PIN = "pin",
    UNITS = "units",
    PRIORITY_CRITICAL = "priority-critical",
    PRIORITY_HIGH = "priority-high",
    PRIORITY_LOW = "priority-low",
    PRIORITY_MEDIUM = "priority-medium",
    PRIORITY_NEGLIGIBLE = "priority-negligible",
    PRIORITY_UNKNOWN = "priority-unknown",
    ADD_CANVAS = "add-canvas",
    ADD_LOGICAL_VOLUME = "add-logical-volume",
    ADD_PARTITION = "add-partition",
    BACK_TO_TOP = "back-to-top",
    BEGIN_DOWNLOADING = "begin-downloading",
    BUNDLE = "bundle",
    CANVAS = "canvas",
    CHANGE_VERSION = "change-version",
    COMMENTS = "comments",
    CONFLICT_GREY = "conflict-grey",
    CONFLICT_RESOLUTION_GREY = "conflict-resolution-grey",
    CONFLICT_RESOLUTION = "conflict-resolution",
    CONFLICT = "conflict",
    CONNECTED = "connected",
    CONTAINERS = "containers",
    COPY_TO_CLIPBOARD = "copy-to-clipboard",
    DISCONNECT = "disconnect",
    EDIT = "edit",
    EXPORT = "export",
    EXPOSED = "exposed",
    FILTER = "filter",
    FORK = "fork",
    GET_LINK = "get-link",
    HALFSCREEN_BAR = "halfscreen-bar",
    HIDE = "hide",
    HIGHLIGHT_OFF = "highlight-off",
    HIGHLIGHT_ON = "highlight-on",
    HOME = "home",
    IMPORT = "import",
    IN_PROGRESS = "in-progress",
    INSPECTOR_DEBUG = "inspector-debug",
    LOADING_STEPS = "loading-steps",
    LOCK_LOCKED_ACTIVE = "lock-locked-active",
    LOCK_LOCKED = "lock-locked",
    LOCK_UNLOCK = "lock-unlock",
    MAXIMISE_BAR = "maximise-bar",
    MINIMISE_BAR = "minimise-bar",
    MOUNT_2 = "mount-2",
    MOUNT = "mount",
    OPEN_TERMINAL = "open-terminal",
    PLANS = "plans",
    PODS = "pods",
    POWER_ERROR = "power-error",
    POWER_OFF = "power-off",
    POWER_ON = "power-on",
    PROFILE = "profile",
    RESTART = "restart",
    REVISIONS = "revisions",
    SECURITY = "security",
    SETTINGS = "settings",
    SHOW = "show",
    SORT_BOTH = "sort-both",
    SORT_DOWN = "sort-down",
    SORT_UP = "sort-up",
    STARRED = "starred",
    STATUS_FAILED_SMALL = "status-failed-small",
    STATUS_IN_PROGRESS_SMALL = "status-in-progress-small",
    STATUS_IN_PROGRESS = "status-in-progress",
    STATUS_QUEUED_SMALL = "status-queued-small",
    STATUS_QUEUED = "status-queued",
    STATUS_SUCCEEDED_SMALL = "status-succeeded-small",
    STATUS_WAITING_SMALL = "status-waiting-small",
    STATUS_WAITING = "status-waiting",
    STATUS = "status",
    SUBMIT_BUG = "submit-bug",
    SUCCESS_GREY = "success-grey",
    SWITCHER_DASHBOARD = "switcher-dashboard",
    SWITCHER_ENVIRONMENTS = "switcher-environments",
    SWITCHER = "switcher",
    TAG = "tag",
    TASK_OUTSTANDING = "task-outstanding",
    TIMED_OUT_GREY = "timed-out-grey",
    TIMED_OUT = "timed-out",
    TOPIC = "topic",
    UNIT_PENDING = "unit-pending",
    UNIT_RUNNING = "unit-running",
    UNMOUNT = "unmount",
    UNSTARRED = "unstarred",
    USER_GROUP = "user-group",
    VIDEO_PLAY = "video-play",
    WARNING_GREY = "warning-grey"
}

export enum SocialIcons {
    FACEBOOK = "facebook",
    INSTAGRAM = "instagram",
    TWITTER = "twitter",
    LINKEDIN = "linkedin",
    YOUTUBE = "youtube",
    GITHUB = "github",
    RSS = "rss",
    EMAIL = "email"
}

export enum AlertIcons {
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success"
}

export class Icon extends Component {

  protected element: HTMLElement = (<i></i>);

  protected name_value: string;

  protected label_element = (<span class="p-radio__label"></span>);

  constructor(props: Props<Icon>) {
    super();
    this.assignProps(props);
  }

  set name(value: StandardIcons | AdditionnalIcons | SocialIcons | AlertIcons | string ) {
    this.element.className = 'p-icon--' + value;
    this.name_value = value.toString();
  }

  get name() {
    return this.name_value;
  }
}

new Icon({ name: AdditionnalIcons.BUNDLE });