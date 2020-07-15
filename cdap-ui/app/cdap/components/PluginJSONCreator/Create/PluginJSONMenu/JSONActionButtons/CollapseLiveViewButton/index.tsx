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
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme): StyleRules => {
  return {
    buttonTooltip: {
      fontSize: '14px',
      backgroundColor: theme.palette.grey[500],
    },
  };
};

export const CollapseLiveViewButtonView = ({ classes, collapseLiveView }) => {
  return (
    <Tooltip
      classes={{
        tooltip: classes.buttonTooltip,
      }}
      title="Close JSON View"
    >
      <Button onClick={collapseLiveView} data-cy="collapse-live-view-btn">
        <FullscreenExitIcon />
      </Button>
    </Tooltip>
  );
};

const CollapseLiveViewButton = withStyles(styles)(CollapseLiveViewButtonView);
export default CollapseLiveViewButton;
