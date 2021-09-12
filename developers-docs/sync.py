import shutil
import os
import demjson

SRC = {
    "base": "../developers/src/i18n/en",
    "structure": "/index.js",
    "mainnet": "/document/mainnet",
    "wallet": "/document/wallet",
    "bot": "/document/bot",
}

DST = {
    "mainnet": {
        "path": "./docs/mainnet",
        "structure_idx": 0,
    },
    "wallet": {
        "path": "./docs/wallet",
        "structure_idx": 1,
    },
    "bot": {
        "path": "./docs/bot",
        "structure_idx": 2,
    },
}

CATE_JSON_TPL = """{
  "label": "%s",
  "position": %d
}"""

MDX_FH_TPL = """---
title: %s
sidebar_position: %d
---

%s"""


def copyFiles(src, dst):
    names = os.listdir(src)
    if not os.path.exists(dst):
        os.makedirs(dst)
    errors = []
    for name in names:
        srcname = os.path.join(src, name)
        dstname = os.path.join(dst, name)
        try:
            if os.path.isdir(srcname):
                copyFiles(srcname, dstname)
            else:
                shutil.copy2(srcname, dstname)
            # XXX What about devices, sockets etc.?
        except OSError as why:
            errors.append((srcname, dstname, str(why)))
        # catch the Error from the recursive copytree so that we can
        # continue with other files
        except Error as err:
            errors.extend(err.args[0])
    try:
        shutil.copystat(src, dst)
    except OSError as why:
        # can't copy file access times on Windows
        if why.winerror is None:
            errors.extend((src, dst, str(why)))
    if errors:
        raise Error(errors)

# def copyFiles(src, dst):
#     shutil.rmtree(dst)
#     shutil.copytree(src, dst)


def readDocumentStructure():
    with open(SRC["base"] + SRC["structure"], "r") as f:
        data = f.read()
        if data.find("export default") != -1:
            data = data[14:].strip()
        return demjson.decode(data)


def getParantNameFromPath(p):
    return p.split("/")[-2]


def getNameFromPath(p):
    return p.split("/")[-1]


def getParentPath(p):
    return "/".join(p.split("/")[:-1])


def buildMetafiles(metafiles, root, lvl):
    rootMeta = {
        "level": lvl,
        "title": root["name"],
        "router": "",
        "name": "",
        "folder": False,
    }
    rootMeta["router"] = root["router"] if "router" in root else ""
    rootMeta["name"] = getNameFromPath(root["router"]) if "router" in root else ""


    firstChild = None
    if "child" in root and len(root["child"]) > 0:
        for child in root["child"]:
            if firstChild is None:
                firstChild = child
            buildMetafiles(metafiles, child, lvl + 1)
        rootMeta["folder"] = True
    if firstChild is not None:
        rootMeta["name"] = getParantNameFromPath(firstChild["router"])
        rootMeta["router"] = getParentPath(firstChild["router"])

    # print(rootMeta)
    print(rootMeta["router"])
    if rootMeta["router"] == "bot/api":
        rootMeta["title"] = 'Bot API Reference'
    elif rootMeta["router"] == "wallet/api":
        rootMeta["title"] = 'Wallet API Reference'

    metafiles.append(rootMeta)


def createMetafiles(files):
    positionCount = {}
    for idx, f in enumerate(files):
        lvl = "lvl-%d" % f["level"]
        if lvl not in positionCount:
            positionCount[lvl] = 1
        if f["folder"]:
            print("create category json", f)
            name = os.path.join("docs", f["router"], "_category_.json")
            data = CATE_JSON_TPL % (f["title"], positionCount[lvl])
            with open(name, "w+") as f:
                f.write(data)
        else:
            print("create front matter", f)
            mdName = os.path.join("docs", f["router"] + ".md")
            fd = open(mdName, "r")
            data = fd.read()
            fd.close()
            data = MDX_FH_TPL % (f["title"], positionCount[lvl], data)
            fd = open(mdName, "w+")
            fd.write(data)
            fd.close()
            pass
        positionCount[lvl] = positionCount[lvl] + 1

def arrangeAPIDocs():
    apiFolders = [('./docs/wallet/api', './api/restful'), ('./docs/bot/api', './api/restful')]
    # move the all api related documents to /api/
    for src, dst in apiFolders:
        copyFiles(src, dst)

    # single files
    singleApiFiles = [
        ('./docs/bot/getting-started/js.md', './api/js-bridge.md'),
        ('./docs/bot/getting-started/schema.md', './api/schema.md'),
    ]
    for src, dst in singleApiFiles:
        shutil.copyfile(src, dst)


if __name__ == "__main__":
    structure = readDocumentStructure()
    for name in ["mainnet", "wallet", "bot"]:
        src = SRC["base"] + SRC[name]
        copyFiles(src, DST[name]["path"])
        metafiles = []
        buildMetafiles(
            metafiles, structure["documentation"][DST[name]["structure_idx"]], 0
        )
        createMetafiles(metafiles)

    arrangeAPIDocs()
