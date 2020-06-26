/*
 * Copyright © 2018 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import CodeEditorWidget from 'components/AbstractWidget/CodeEditorWidget';
import JsonEditorWidget from 'components/AbstractWidget/CodeEditorWidget/JsonEditorWidget';
import CSVWidget from 'components/AbstractWidget/CSVWidget';
import DatasetSelector from 'components/AbstractWidget/DatasetSelectorWidget';
import DateRangeWidget from 'components/AbstractWidget/DateRangeWidget';
import DateTimeWidget from 'components/AbstractWidget/DateTimeWidget';
import DLPCustomWidget from 'components/AbstractWidget/DLPCustomWidget';
import MultiSelect from 'components/AbstractWidget/FormInputs/MultiSelect';
import NumberWidget from 'components/AbstractWidget/FormInputs/Number';
import PasswordWidget from 'components/AbstractWidget/FormInputs/Password';
import Select from 'components/AbstractWidget/FormInputs/Select';
import TextBox from 'components/AbstractWidget/FormInputs/TextBox';
import FunctionDropdownAliasWidget from 'components/AbstractWidget/FunctionDropdownAliasWidget';
import GetSchemaWidget from 'components/AbstractWidget/GetSchemaWidget';
import InputFieldDropdown from 'components/AbstractWidget/InputFieldDropdown';
import JoinTypeWidget from 'components/AbstractWidget/JoinTypeWidget';
import KeyValueDropdownWidget from 'components/AbstractWidget/KeyValueDropdownWidget';
import KeyValueWidget from 'components/AbstractWidget/KeyValueWidget';
import KeyValueEncodedWidget from 'components/AbstractWidget/KeyValueWidget/KeyValueEncodedWidget';
import MemorySelectWidget from 'components/AbstractWidget/MemorySelectWidget';
import MemoryTextbox from 'components/AbstractWidget/MemoryTextbox';
import MultipleValuesWidget from 'components/AbstractWidget/MultipleValuesWidget';
import PluginListWidget from 'components/AbstractWidget/PluginListWidget';
import RadioGroupWidget from 'components/AbstractWidget/RadioGroupWidget';
import RulesEngineEditor from 'components/AbstractWidget/RulesEngineEditor';
import SecureKeyPassword from 'components/AbstractWidget/SecureKey/SecureKeyPassword';
import SecureKeyText from 'components/AbstractWidget/SecureKey/SecureKeyText';
import SecureKeyTextarea from 'components/AbstractWidget/SecureKey/SecureKeyTextarea';
import SqlConditionsWidget from 'components/AbstractWidget/SqlConditionsWidget';
import SqlSelectorWidget from 'components/AbstractWidget/SqlSelectorWidget';
import ToggleSwitchWidget from 'components/AbstractWidget/ToggleSwitchWidget';
import WranglerEditor from 'components/AbstractWidget/WranglerEditor';
import PluginConnectionBrowser from 'components/DataPrepConnections/PluginConnectionBrowser';
import * as React from 'react';
import { objectQuery } from 'services/helpers';

export enum CodeEditorType {
  Textarea = 'TEXTAREA',
  Javascript = 'JAVASCRIPT',
  JSON = 'JSON',
  Python = 'PYTHON',
  Scala = 'SCALA',
  SQL = 'SQL',
}

function getCodeEditor(props, codeEditorType) {
  let component;
  switch (codeEditorType) {
    case CodeEditorType.Textarea:
      component = (
        <CodeEditorWidget mode="plain_text" rows={getRowsFromWidgetProps(props)} {...props} />
      );
      break;
    case CodeEditorType.Javascript:
      component = <CodeEditorWidget mode="javascript" rows={25} {...props} />;
      break;
    case CodeEditorType.JSON:
      component = <JsonEditorWidget rows={getRowsFromWidgetProps(props)} {...props} />;
      break;
    case CodeEditorType.Python:
      component = <CodeEditorWidget mode="python" rows={25} {...props} />;
      break;
    case CodeEditorType.Scala:
      component = <CodeEditorWidget mode="scala" rows={25} {...props} />;
      break;
    case CodeEditorType.SQL:
      component = <CodeEditorWidget mode="sql" rows={15} {...props} />;
      break;
  }
  (component as any).getWidgetAttributes = () => {
    return {
      default: { type: 'string', required: false },
      rows: { type: 'number', required: false },
    };
  };
  return component;
}

function Textarea(props) {
  const rows = getRowsFromWidgetProps(props);
  return <CodeEditorWidget mode="plain_text" rows={rows} {...props} />;
}

function JavascriptEditor(props) {
  return <CodeEditorWidget mode="javascript" rows={25} {...props} />;
}

function JSONEditor(props) {
  const rows = getRowsFromWidgetProps(props);
  return <JsonEditorWidget rows={rows} {...props} />;
}

function PythonEditor(props) {
  return <CodeEditorWidget mode="python" rows={25} {...props} />;
}

function ScalaEditor(props) {
  return <CodeEditorWidget mode="scala" rows={25} {...props} />;
}

function SQLEditor(props) {
  return <CodeEditorWidget mode="sql" rows={15} {...props} />;
}

(Textarea as any).getWidgetAttributes = () => {
  return {
    default: { type: 'string', required: false },
    rows: { type: 'number', required: false },
  };
};

(JavascriptEditor as any).getWidgetAttributes = () => {
  return {
    default: { type: 'string', required: false },
    rows: { type: 'number', required: false },
  };
};

(JSONEditor as any).getWidgetAttributes = () => {
  return {
    default: { type: 'string', required: false },
    rows: { type: 'number', required: false },
  };
};

(PythonEditor as any).getWidgetAttributes = () => {
  return {
    default: { type: 'string', required: false },
    rows: { type: 'number', required: false },
  };
};

(ScalaEditor as any).getWidgetAttributes = () => {
  return {
    default: { type: 'string', required: false },
    rows: { type: 'number', required: false },
  };
};

(SQLEditor as any).getWidgetAttributes = () => {
  return {
    default: { type: 'string', required: false },
    rows: { type: 'number', required: false },
  };
};

/**
 * Please maintain alphabetical order of the widget factory.
 *
 * I have put the special widgets at the bottom (ie. Joiner and Wrangler)
 * and also grouped together all the code editor types.
 */
export const WIDGET_FACTORY = {
  'connection-browser': PluginConnectionBrowser,
  csv: CSVWidget,
  'dataset-selector': DatasetSelector,
  daterange: DateRangeWidget,
  datetime: DateTimeWidget,
  'ds-multiplevalues': MultipleValuesWidget,
  dsv: CSVWidget,
  'function-dropdown-with-alias': FunctionDropdownAliasWidget,
  dlp: DLPCustomWidget,
  'get-schema': GetSchemaWidget,
  'input-field-selector': InputFieldDropdown,
  'keyvalue-dropdown': KeyValueDropdownWidget,
  'keyvalue-encoded': KeyValueEncodedWidget,
  keyvalue: KeyValueWidget,
  'memory-dropdown': MemorySelectWidget,
  'memory-textbox': MemoryTextbox,
  'multi-select': MultiSelect,
  number: NumberWidget,
  password: PasswordWidget,
  'plugin-list': PluginListWidget,
  'radio-group': RadioGroupWidget,
  'securekey-password': SecureKeyPassword,
  'securekey-text': SecureKeyText,
  'securekey-textarea': SecureKeyTextarea,
  select: Select,
  text: TextBox,
  textbox: TextBox,
  toggle: ToggleSwitchWidget,

  // CODE EDITORS
  'javascript-editor': JavascriptEditor,
  'json-editor': JSONEditor,
  'python-editor': PythonEditor,
  'scala-editor': ScalaEditor,
  'sql-editor': SQLEditor,
  textarea: Textarea,

  // JOINS
  'join-types': JoinTypeWidget,
  'sql-conditions': SqlConditionsWidget,
  'sql-select-fields': SqlSelectorWidget,

  // Rules Engine
  'rules-engine-editor': RulesEngineEditor,

  // Wrangler
  'wrangler-directives': WranglerEditor,
};

export default new Proxy(WIDGET_FACTORY, {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : TextBox;
  },
});

function getRowsFromWidgetProps(props, defaultRows = 5) {
  let rows = objectQuery(props, 'widgetProps', 'rows') || defaultRows;
  if (typeof rows === 'string') {
    rows = parseInt(rows, 10);
    rows = isNaN(rows) ? defaultRows : rows;
  }
  return rows;
}
