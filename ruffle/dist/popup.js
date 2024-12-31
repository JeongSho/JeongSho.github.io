/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ../core/dist/public/config/load-options.js
/**
 * Represents the various types of auto-play behaviours that are supported.
 */
var AutoPlay;
(function (AutoPlay) {
    /**
     * The player should automatically play the movie as soon as it is loaded.
     *
     * If the browser does not support automatic audio, the movie will begin
     * muted.
     */
    AutoPlay["On"] = "on";
    /**
     * The player should not attempt to automatically play the movie.
     *
     * This will leave it to the user or API to actually play when appropriate.
     */
    AutoPlay["Off"] = "off";
    /**
     * The player should automatically play the movie as soon as it is deemed
     * "appropriate" to do so.
     *
     * The exact behaviour depends on the browser, but commonly requires some
     * form of user interaction on the page in order to allow auto playing videos
     * with sound.
     */
    AutoPlay["Auto"] = "auto";
})(AutoPlay || (AutoPlay = {}));
/**
 * Controls whether the content is letterboxed or pillarboxed when the
 * player's aspect ratio does not match the movie's aspect ratio.
 *
 * When letterboxed, black bars will be rendered around the exterior
 * margins of the content.
 */
var Letterbox;
(function (Letterbox) {
    /**
     * The content will never be letterboxed.
     */
    Letterbox["Off"] = "off";
    /**
     * The content will only be letterboxed if the content is running fullscreen.
     */
    Letterbox["Fullscreen"] = "fullscreen";
    /**
     * The content will always be letterboxed.
     */
    Letterbox["On"] = "on";
})(Letterbox || (Letterbox = {}));
/**
 * When the player is muted, this controls whether or not Ruffle will show a
 * "click to unmute" overlay on top of the movie.
 */
var UnmuteOverlay;
(function (UnmuteOverlay) {
    /**
     * Show an overlay explaining that the movie is muted.
     */
    UnmuteOverlay["Visible"] = "visible";
    /**
     * Don't show an overlay and pretend that everything is fine.
     */
    UnmuteOverlay["Hidden"] = "hidden";
})(UnmuteOverlay || (UnmuteOverlay = {}));
/**
 * Console logging level.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["Error"] = "error";
    LogLevel["Warn"] = "warn";
    LogLevel["Info"] = "info";
    LogLevel["Debug"] = "debug";
    LogLevel["Trace"] = "trace";
})(LogLevel || (LogLevel = {}));
/**
 * The window mode of a Ruffle player.
 */
var WindowMode;
(function (WindowMode) {
    /**
     * The Flash content is rendered in its own window and layering is done with the browser's
     * default behavior.
     *
     * In Ruffle, this mode functions like `WindowMode::Opaque` and will layer the Flash content
     * together with other HTML elements.
     */
    WindowMode["Window"] = "window";
    /**
     * The Flash content is layered together with other HTML elements, and the stage color is
     * opaque. Content can render above or below Ruffle based on CSS rendering order.
     */
    WindowMode["Opaque"] = "opaque";
    /**
     * The Flash content is layered together with other HTML elements, and the SWF stage color is
     * transparent. Content beneath Ruffle will be visible through transparent areas.
     */
    WindowMode["Transparent"] = "transparent";
    /**
     * Request compositing with hardware acceleration when possible.
     * This mode has no effect in Ruffle and will function like `WindowMode.Opaque`.
     */
    WindowMode["Direct"] = "direct";
    /**
     * Request a direct rendering path, bypassing browser compositing when possible.
     * This mode has no effect in Ruffle and will function like `WindowMode::Opaque`.
     */
    WindowMode["Gpu"] = "gpu";
})(WindowMode || (WindowMode = {}));
/**
 * The render backend of a Ruffle player.
 *
 * The available backends may change in future releases.
 */
var RenderBackend;
(function (RenderBackend) {
    /**
     * An [in-development API](https://caniuse.com/webgpu) that will be preferred if available in the future.
     * Should behave the same as wgpu-webgl, except with lower overhead and thus better performance.
     */
    RenderBackend["WebGpu"] = "webgpu";
    /**
     * The most featureful and currently preferred backend.
     * Rendering is done the same way as in the desktop app, then translated to WebGL on-the-fly.
     */
    RenderBackend["WgpuWebgl"] = "wgpu-webgl";
    /**
     * A vanilla WebGL backend. Was the default backend until the start of 2023,
     * but is now used as a fallback for devices that do not support WebGL 2.
     * Supports fewer features and has a faster initialization time;
     * may be useful for content that does not need advanced features like bitmap drawing or blend modes.
     */
    RenderBackend["Webgl"] = "webgl";
    /**
     * The slowest and most basic backend, used as a fallback when all else fails.
     * However, this is currently the only backend that accurately scales hairline strokes.
     * If you notice excessively thick strokes in specific content,
     * you may want to use the canvas renderer for that content until the issue is resolved.
     */
    RenderBackend["Canvas"] = "canvas";
})(RenderBackend || (RenderBackend = {}));
/**
 * Represents the various context menu options that are supported.
 */
var ContextMenu;
(function (ContextMenu) {
    /**
     * The context menu should appear when right-clicking or long-pressing
     * the Ruffle instance.
     */
    ContextMenu["On"] = "on";
    /**
     * The context menu should only appear when right-clicking
     * the Ruffle instance.
     */
    ContextMenu["RightClickOnly"] = "rightClickOnly";
    /**
     * The context menu should not appear when right-clicking or long-pressing
     * the Ruffle instance.
     */
    ContextMenu["Off"] = "off";
})(ContextMenu || (ContextMenu = {}));
/**
 * Represents the player runtime to emulate.
 */
var PlayerRuntime;
(function (PlayerRuntime) {
    /**
     * Emulate Adobe AIR.
     */
    PlayerRuntime["AIR"] = "air";
    /**
     * Emulate Adobe Flash Player.
     */
    PlayerRuntime["FlashPlayer"] = "flashPlayer";
})(PlayerRuntime || (PlayerRuntime = {}));
/**
 * The handling mode of links opening a new website.
 */
var OpenURLMode;
(function (OpenURLMode) {
    /**
     * Allow all links to open a new website.
     */
    OpenURLMode["Allow"] = "allow";
    /**
     * A confirmation dialog opens with every link trying to open a new website.
     */
    OpenURLMode["Confirm"] = "confirm";
    /**
     * Deny all links to open a new website.
     */
    OpenURLMode["Deny"] = "deny";
})(OpenURLMode || (OpenURLMode = {}));
/**
 * The networking API access mode of the Ruffle player.
 */
var NetworkingAccessMode;
(function (NetworkingAccessMode) {
    /**
     * All networking APIs are permitted in the SWF file.
     */
    NetworkingAccessMode["All"] = "all";
    /**
     * The SWF file may not call browser navigation or browser interaction APIs.
     *
     * The APIs navigateToURL(), fscommand() and ExternalInterface.call() are
     * prevented in this mode.
     */
    NetworkingAccessMode["Internal"] = "internal";
    /**
     * The SWF file may not call browser navigation or browser interaction APIs
     * and it cannot use any SWF-to-SWF communication APIs.
     *
     * Additionally to the ones in internal mode, the APIs sendToURL(),
     * FileReference.download(), FileReference.upload(), Loader.load(),
     * LocalConnection.connect(), LocalConnection.send(), NetConnection.connect(),
     * NetStream.play(), Security.loadPolicyFile(), SharedObject.getLocal(),
     * SharedObject.getRemote(), Socket.connect(), Sound.load(), URLLoader.load(),
     * URLStream.load() and XMLSocket.connect() are prevented in this mode.
     *
     * This mode is not implemented yet.
     */
    NetworkingAccessMode["None"] = "none";
})(NetworkingAccessMode || (NetworkingAccessMode = {}));

;// ../core/dist/public/config/default.js

const DEFAULT_CONFIG = {
    allowScriptAccess: false,
    parameters: {},
    autoplay: AutoPlay.Auto,
    backgroundColor: null,
    letterbox: Letterbox.Fullscreen,
    unmuteOverlay: UnmuteOverlay.Visible,
    upgradeToHttps: true,
    compatibilityRules: true,
    favorFlash: true,
    warnOnUnsupportedContent: true,
    logLevel: LogLevel.Error,
    showSwfDownload: false,
    contextMenu: ContextMenu.On,
    // Backwards-compatibility option
    preloader: true,
    splashScreen: true,
    maxExecutionDuration: 15,
    base: null,
    menu: true,
    allowFullscreen: false,
    salign: "",
    forceAlign: false,
    quality: "high",
    scale: "showAll",
    forceScale: false,
    frameRate: null,
    wmode: WindowMode.Window,
    publicPath: null,
    polyfills: true,
    playerVersion: null,
    preferredRenderer: null,
    openUrlMode: OpenURLMode.Allow,
    allowNetworking: NetworkingAccessMode.All,
    openInNewTab: null,
    socketProxy: [],
    fontSources: [],
    defaultFonts: {},
    credentialAllowList: [],
    playerRuntime: PlayerRuntime.FlashPlayer,
};

;// ./src/utils.ts

const DEFAULT_OPTIONS = {
    ...DEFAULT_CONFIG,
    ruffleEnable: true,
    ignoreOptout: false,
    autostart: false,
    showReloadButton: false,
    swfTakeover: true,
};
// TODO: Once https://crbug.com/798169 is addressed, just use browser.
// We have to wait until whatever version of Chromium supports that
// is old enough to be the oldest version we want to support.
let i18n;
let scripting;
let storage;
let utils_tabs;
let runtime;
let permissions;
let declarativeNetRequest;
function promisify(func) {
    return new Promise((resolve, reject) => {
        func((result) => {
            const error = chrome.runtime.lastError;
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
}
if (typeof browser !== "undefined") {
    i18n = browser.i18n;
    scripting = browser.scripting;
    storage = browser.storage;
    utils_tabs = browser.tabs;
    runtime = browser.runtime;
    permissions = browser.permissions;
    declarativeNetRequest = browser.declarativeNetRequest;
}
else if (typeof chrome !== "undefined") {
    i18n = chrome.i18n;
    scripting = chrome.scripting;
    storage = chrome.storage;
    utils_tabs = chrome.tabs;
    runtime = chrome.runtime;
    permissions = chrome.permissions;
    declarativeNetRequest = chrome.declarativeNetRequest;
}
else {
    throw new Error("Extension API not found.");
}
const openOptionsPage = () => runtime.openOptionsPage();
const openPlayerPage = () => promisify((cb) => utils_tabs.create({ url: "/player.html" }, cb));
const openOnboardPage = () => promisify((cb) => utils_tabs.create({ url: "/onboard.html" }, cb));
async function getOptions() {
    const options = await storage.sync.get();
    // Copy over default options if they don't exist yet.
    return { ...DEFAULT_OPTIONS, ...options };
}
/**
 * Gets the options that are explicitly different from the defaults.
 *
 * In the future we should just not store options we don't want to set.
 */
async function getExplicitOptions() {
    const options = await getOptions();
    const defaultOptions = DEFAULT_OPTIONS;
    for (const key in defaultOptions) {
        // @ts-expect-error: Element implicitly has an any type
        if (key in options && defaultOptions[key] === options[key]) {
            // @ts-expect-error: Element implicitly has an any type
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete options[key];
        }
    }
    // This value is specific to the internal extension pages, and is always "default"
    if ("responseHeadersUnsupported" in options) {
        delete options["responseHeadersUnsupported"];
    }
    return options;
}
const hasAllUrlsPermission = async () => {
    const allPermissions = await permissions.getAll();
    return allPermissions.origins?.includes("<all_urls>") ?? false;
};
async function hasHostPermissionForSpecifiedTab(origin) {
    try {
        return origin
            ? await permissions.contains({
                origins: [origin],
            })
            : await hasAllUrlsPermission();
    }
    catch {
        // catch error that occurs for special urls like about:
        return false;
    }
}
async function hasHostPermissionForActiveTab() {
    const [activeTab] = await utils_tabs.query({
        active: true,
        currentWindow: true,
    });
    return await hasHostPermissionForSpecifiedTab(activeTab?.url);
}

;// ./src/common.ts

class CheckboxOption {
    constructor(checkbox, label) {
        this.checkbox = checkbox;
        this.label = label;
    }
    get input() {
        return this.checkbox;
    }
    get value() {
        return this.checkbox.checked;
    }
    set value(value) {
        this.checkbox.checked = value;
    }
}
class NumberOption {
    constructor(numberInput, label) {
        this.numberInput = numberInput;
        this.label = label;
        this.numberInput.addEventListener("input", () => {
            this.numberInput.reportValidity();
        });
    }
    get input() {
        return this.numberInput;
    }
    get value() {
        const ni = this.numberInput;
        const num = ni.valueAsNumber;
        if (Number.isNaN(num)) {
            return null;
        }
        if (ni.min) {
            const min = Number(ni.min);
            if (min > num) {
                return min;
            }
        }
        if (ni.max) {
            const max = Number(ni.max);
            if (num > max) {
                return max;
            }
        }
        return num;
    }
    set value(value) {
        this.numberInput.value = value?.toString() ?? "";
    }
}
class SelectOption {
    constructor(select, label) {
        this.select = select;
        this.label = label;
        // Localize each `option`, if relevant.
        Array.prototype.forEach.call(select.options, (option) => {
            if (option.hasAttribute("id")) {
                const message = i18n.getMessage(`settings_${option.id}`);
                if (message) {
                    option.textContent = message;
                }
            }
        });
    }
    get input() {
        return this.select;
    }
    get value() {
        const index = this.select.selectedIndex;
        const option = this.select.options[index];
        // Convert the empty string to `null`.
        return option.value || null;
    }
    set value(value) {
        // Convert `null` to the empty string.
        value ??= "";
        const options = Array.from(this.select.options);
        const index = options.findIndex((option) => option.value === value);
        this.select.selectedIndex = index;
    }
}
function getElement(option) {
    const label = option.getElementsByTagName("label")[0];
    const [input] = option.getElementsByTagName("input");
    if (input) {
        if (input.type === "checkbox") {
            return new CheckboxOption(input, label);
        }
        if (input.type === "number") {
            return new NumberOption(input, label);
        }
    }
    const [select] = option.getElementsByTagName("select");
    if (select) {
        return new SelectOption(select, label);
    }
    throw new Error("Unknown option element");
}
function findOptionElements() {
    const camelize = (s) => s.replace(/[^a-z\d](.)/gi, (_, char) => char.toUpperCase());
    const elements = new Map();
    for (const option of document.getElementsByClassName("option")) {
        const element = getElement(option);
        const key = camelize(element.input.id);
        elements.set(key, element);
    }
    return elements;
}
async function bindOptions(onChange) {
    const elements = findOptionElements();
    const options = await getOptions();
    for (const [key, element] of elements.entries()) {
        // Bind initial value.
        element.value = options[key];
        // Prevent transition on load.
        // Method from https://stackoverflow.com/questions/11131875.
        element.label.classList.add("notransition");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element.label.offsetHeight; // Trigger a reflow, flushing the CSS changes.
        element.label.classList.remove("notransition");
        // Localize label.
        const message = i18n.getMessage(`settings_${element.input.id}`);
        if (message) {
            element.label.textContent = message;
        }
        // Listen for user input.
        element.input.addEventListener("change", () => {
            const value = element.value;
            options[key] = value;
            storage.sync.set({ [key]: value });
        });
    }
    // Listen for future changes.
    storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== "sync") {
            return;
        }
        for (const [key, option] of Object.entries(changes)) {
            const element = elements.get(key);
            if (!element) {
                continue;
            }
            element.value = option.newValue;
            options[key] = option.newValue;
        }
        if (onChange) {
            onChange(options);
        }
    });
    if (onChange) {
        onChange(options);
    }
}
async function resetOptions() {
    // This setting is consistent for the browser in use and should not change
    const data = await utils.storage.sync.get({
        responseHeadersUnsupported: false,
    });
    await utils.storage.sync.clear();
    if (data["responseHeadersUnsupported"]) {
        utils.storage.sync.set({ responseHeadersUnsupported: true });
    }
}

;// ../core/dist/build-info.js
/**
 * Stores build information about <b>this specific version of the `ruffle-core` library</b>.
 *
 * It does not represent the version of Ruffle that may be in use by the page (for example, if a browser extension overrides it).
 *
 * @privateRemarks
 * This is generated at build time via `set_version.ts`.
 */
const buildInfo = {
    versionNumber: "0.1.0",
    versionName: "nightly 2024-12-31",
    versionChannel: "nightly",
    buildDate: "2024-12-31T00:06:07.851Z",
    commitHash: "2a81c86504ecc53273ca750278b9da171cb84b60",
};

;// ./src/popup.ts



let activeTab;
let savedOptions;
let tabOptions;
let statusIndicator;
let statusText;
let reloadButton;
// prettier-ignore
const STATUS_COLORS = {
    "status_init": "gray",
    "status_message_init": "gray",
    "status_no_tabs": "red",
    "status_result_disabled": "gray",
    "status_result_error": "red",
    "status_result_optout": "gray",
    "status_result_protected": "gray",
    "status_result_running": "green",
    "status_result_running_protected": "green",
    "status_tabs_error": "red",
};
async function queryTabStatus(listener) {
    listener("status_init");
    let tabs;
    try {
        tabs = await utils_tabs.query({
            currentWindow: true,
            active: true,
        });
        if (tabs.length < 1) {
            listener("status_no_tabs");
            return;
        }
        if (tabs.length > 1) {
            throw new Error(`Got ${tabs.length} tabs in response to active tab query.`);
        }
    }
    catch (_e) {
        listener("status_tabs_error");
        return;
    }
    activeTab = tabs[0];
    // FIXME: `activeTab.url` returns `undefined` on Chrome as it requires the `tabs`
    // permission, which we don't set in `manifest.json5` because of #11098.
    const url = activeTab.url ? new URL(activeTab.url) : null;
    if (url &&
        url.origin === window.location.origin &&
        url.pathname === "/player.html") {
        listener("status_result_running_protected");
        return;
    }
    listener("status_message_init");
    let response;
    try {
        response = await utils_tabs.sendMessage(activeTab.id, {
            type: "ping",
        });
    }
    catch (_e) {
        // Try again after 0.2 seconds, Firefox takes some time to grant temporary
        // host permissions when the <all_urls> permission has not been granted.
        await new Promise((resolve) => setTimeout(resolve, 200));
        try {
            response = await utils_tabs.sendMessage(activeTab.id, {
                type: "ping",
            });
        }
        catch (_e) {
            listener("status_result_protected");
            reloadButton.disabled = true;
            return;
        }
    }
    if (!response) {
        listener("status_result_error");
        return;
    }
    tabOptions = response.tabOptions;
    if (response.loaded) {
        listener("status_result_running");
    }
    else if (tabOptions.ruffleEnable) {
        listener("status_result_optout");
    }
    else {
        listener("status_result_disabled");
    }
    optionsChanged();
}
/**
 * Should only be called on data type objects without any "cyclic members" to avoid infinite recursion.
 */
function deepEqual(x, y) {
    if (typeof x === "object" &&
        typeof y === "object" &&
        x !== null &&
        y !== null) {
        // Two non-null objects.
        for (const [key, value] of Object.entries(x)) {
            if (!deepEqual(value, y[key])) {
                return false;
            }
        }
        for (const [key, value] of Object.entries(y)) {
            if (!deepEqual(value, x[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        // Not two non-null objects.
        return x === y;
    }
}
function optionsChanged() {
    if (!tabOptions) {
        return;
    }
    const showReloadButton = tabOptions.showReloadButton;
    const notDifferent = deepEqual(savedOptions, tabOptions);
    reloadButton.disabled = notDifferent && !showReloadButton;
}
async function displayTabStatus() {
    await queryTabStatus((status) => {
        statusIndicator.style.setProperty("--color", STATUS_COLORS[status]);
        statusText.textContent = i18n.getMessage(status);
    });
}
window.addEventListener("DOMContentLoaded", async () => {
    const data = await storage.sync.get({
        responseHeadersUnsupported: false,
    });
    if (data["responseHeadersUnsupported"]) {
        document
            .getElementById("swf_takeover")
            .parentElement.classList.add("hidden");
    }
    bindOptions((options) => {
        savedOptions = options;
        optionsChanged();
    });
    statusIndicator = document.getElementById("status-indicator");
    statusText = document.getElementById("status-text");
    const versionText = document.getElementById("version-text");
    versionText.textContent = buildInfo.versionName;
    const optionsButton = document.getElementById("options-button");
    optionsButton.addEventListener("click", async () => {
        await openOptionsPage();
        window.close();
    });
    const playerButton = document.getElementById("player-button");
    playerButton.textContent = i18n.getMessage("open_player_page");
    playerButton.addEventListener("click", async () => {
        await openPlayerPage();
        window.close();
    });
    reloadButton = document.getElementById("reload-button");
    reloadButton.textContent = i18n.getMessage("action_reload");
    reloadButton.addEventListener("click", async () => {
        await utils_tabs.reload(activeTab.id);
        window.close();
    });
    await displayTabStatus();
    const permissionsButton = document.getElementById("permissions-button");
    permissionsButton.textContent = i18n.getMessage("grant_single_site_permission");
    const url = activeTab?.url ? new URL(activeTab.url) : null;
    if (url &&
        ["https:", "http:"].includes(url.protocol) &&
        !(await hasHostPermissionForActiveTab())) {
        permissionsButton.classList.remove("hidden");
        permissionsButton.addEventListener("click", () => {
            permissions.request({
                origins: [url.toString()],
            });
            window.close();
        });
    }
});

/******/ })()
;