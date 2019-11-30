

CREATE TABLE IF NOT EXISTS standing (
	id SERIAL PRIMARY KEY,
	team_name VARCHAR(255),	
	division VARCHAR(255),
	conference VARCHAR(255),
	year VARCHAR(255),   
  w_score	INT,
  l_score INT,
  pct_score FLOAT,
  cgb_score FLOAT,
  home_win_score INT,
	home_loss_score INT,
  div_win_score INT, 1  1-2
	div_loss_score INT,2
  conf_win_score INT,
	conf_loss_score INT,
  l10_win_score INT,
	l10_loss_score INT,
  pf_score FLOAT,
  pa_score FLOAT,  
  diff_score FLOAT,
	strk_score VARCHAR(255)
);
