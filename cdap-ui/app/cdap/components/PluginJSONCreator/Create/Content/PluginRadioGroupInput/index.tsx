/*
 * Copyright © 2020 Cask Data, Inc.
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

import WidgetWrapper from 'components/ConfigurationGroup/WidgetWrapper';
import * as React from 'react';

const PluginRadioGroupInput = ({ setValue, value, label, options, required = true }) => {
  const widget = {
    label,
    name: label,
    'widget-type': 'radio-group',
    'widget-attributes': {
      layout: 'inline',
      default: options ? options[0].value : '',
      options,
    },
  };

  const property = {
    required,
    name: label,
  };

  return (
    <WidgetWrapper
      widgetProperty={widget}
      pluginProperty={property}
      value={value}
      onChange={setValue}
    />
  );
};

export default PluginRadioGroupInput;