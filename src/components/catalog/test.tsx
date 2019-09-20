export default test = [{
    label: '基本信息',
    parameters: [{
        'label': '项目名称',
        'id': 'projectName',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string', required: true, message: '此项不能为空' }
    }, {
        'label': '门店名称',
        'id': 'storeName',
        'formType': 'select',
        'default': 'aa1',
        'options': [{ value: 'aa1', label: 'AA1' }, { value: 'bb1', label: 'BB' }, { value: 'cc', label: 'CC' }],
        'validate': { type: 'string' }
    }, {
        'label': '建设单位',
        'id': 'constructionUnit',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '编制单位',
        'id': 'authorizedUnit',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '工程地点',
        'id': 'engineeringSite',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '制图日期',
        'id': 'cartographicDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '业主姓名',
        'id': 'ownerName',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'ownerDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    },  {
        'label': '设计总监',
        'id': 'designDirector',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'designDirectorDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '工程管家',
        'id': 'projectSteward',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'projectStewardDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    },  {
        'label': '工程总监',
        'id': 'projectDirector',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'projectDirectorDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '施工经理',
        'id': 'constructionManager',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'constructionManagerDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    },  {
        'label': '设计师',
        'id': 'theDesigner',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'designerDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '订制设计师',
        'id': 'productDesigner',
        'formType': 'input',
        'default': '',
        'validate': { type: 'string' }
    }, {
        'label': '签字日期',
        'id': 'productDesignerDate',
        'formType': 'datePicker',
        'default': '',
        'validate': { type: 'string' }
    }
    ]
}, {
    label: '比例设置',
    parameters: [{
        'label': '平面比例',
        'id': 'planProportion',
        'formType': 'select',
        'default': '',
        'options': [
        { value: '', label: '自动' }, 
        { value: '1/30', label: '1:30' }, 
        { value: '1/40', label: '1:40' },
        { value: '1/50', label: '1:50' }, 
        { value: '1/75', label: '1:75' },
        { value: '1/100', label: '1:100' }, 
        { value: '1/125', label: '1:125' },
        { value: '1/150', label: '1:150' }
        ],
        'validate': { type: 'string' }
    }, {
        'label': '立面比例',
        'id': 'elevationProportion',
        'formType': 'select',
        'default': 'aa1',
        'options': [
            { value: '', label: '自动' }, 
            { value: '1/30', label: '1:30' }, 
            { value: '1/40', label: '1:40' },
            { value: '1/50', label: '1:50' }, 
            { value: '1/75', label: '1:75' },
            { value: '1/100', label: '1:100' }, 
            { value: '1/125', label: '1:125' },
            { value: '1/150', label: '1:150' }
            ],
        'validate': { type: 'string' }
    }]
}];