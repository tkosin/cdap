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

import * as React from 'react';

import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme): StyleRules => {
  return {
    buttonTooltip: {
      fontSize: '14px',
      backgroundColor: theme.palette.grey[500],
    },
  };
};

export const ExpandLiveViewButtonView = ({ classes, expandLiveView }) => {
  return (
    <Tooltip
      title="Open Live View"
      classes={{
        tooltip: classes.buttonTooltip,
      }}
    >
      <Button onClick={expandLiveView} data-cy="open-live-view-btn">
        <CodeIcon />
      </Button>
    </Tooltip>
  );
};

const ExpandLiveViewButton = withStyles(styles)(ExpandLiveViewButtonView);
export default ExpandLiveViewButton;
